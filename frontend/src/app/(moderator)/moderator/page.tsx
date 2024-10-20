"use client";
import React, { useState, useEffect } from 'react';
import ShowArticleList from '../../(components)/showArticleList'; // Ensure this path is correct for your project
import { Article } from '../../(components)/Article'; // Ensure the correct path to the Article type

export default function ModeratorPage() {
  const [unmoderatedArticles, setUnmoderatedArticles] = useState<Article[]>([]);
  const [moderatedArticles, setModeratedArticles] = useState<{
    accepted: Article[];  // Specify that accepted is an array of Article
    denied: Article[];    // Specify that denied is an array of Article
  }>({
    accepted: [],
    denied: [],
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article`);

        if (!res.ok) {
          throw new Error(`Error fetching articles: ${res.status} ${res.statusText}`);
        }

        const articles = await res.json();

        // Separate unmoderated, accepted, and denied articles
        setUnmoderatedArticles(articles.filter((article: Article) => !article.moderated));
        setModeratedArticles({
          accepted: articles.filter((article: Article) => article.status === 'accepted'),
          denied: articles.filter((article: Article) => article.status === 'denied'),
        });
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    };

    fetchArticles();
  }, []);

  const handleAccept = async (article: Article) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${article._id}/accept`, {
        method: 'PATCH',
      });

      if (res.ok) {
        // Update the moderated articles state
        setModeratedArticles((prev) => ({
          ...prev,
          accepted: [...prev.accepted, { ...article, status: 'accepted' }],
        }));
        // Remove from unmoderated
        setUnmoderatedArticles((prev) => prev.filter((a) => a._id !== article._id));
      } else {
        console.error('Failed to accept article:', await res.text());
      }
    } catch (err) {
      console.error('Error accepting article:', err);
    }
  };

  const handleDeny = async (article: Article) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${article._id}/deny`, {
        method: 'PATCH',
      });

      if (res.ok) {
        // Update the moderated articles state
        setModeratedArticles((prev) => ({
          ...prev,
          denied: [...prev.denied, { ...article, status: 'denied' }],
        }));
        // Remove from unmoderated
        setUnmoderatedArticles((prev) => prev.filter((a) => a._id !== article._id));
      } else {
        console.error('Failed to deny article:', await res.text());
      }
    } catch (err) {
      console.error('Error denying article:', err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 text-center">
        <h1 style={{ textAlign: 'center' }}><u>Moderator Page</u></h1>
        <br />
        {/* Unmoderated Articles */}
        <h1>Unmoderated Articles</h1>
        <ShowArticleList
          articles={unmoderatedArticles}
          moderationMode={true}
          onAccept={handleAccept}
          onDeny={handleDeny}
        />

        {/* Moderated Articles */}
        <h1>Accepted Articles</h1>
        <ShowArticleList articles={moderatedArticles.accepted} />

        <h1>Denied Articles</h1>
        <ShowArticleList articles={moderatedArticles.denied} />
      </div>
    </div >
  );
}

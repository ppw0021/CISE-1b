"use client";
import React, { useState, useEffect } from 'react';
import ShowArticleList from '../../(components)/showArticleList'; // Ensure this path is correct for your project

export default function ModeratorPage() {
  const [unmoderatedArticles, setUnmoderatedArticles] = useState([]);
  const [moderatedArticles, setModeratedArticles] = useState({
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
        setUnmoderatedArticles(articles.filter((article: any) => !article.moderated));
        setModeratedArticles({
          accepted: articles.filter((article: any) => article.status === 'accepted'),
          denied: articles.filter((article: any) => article.status === 'denied'),
        });
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    };
  
    fetchArticles();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}><u>Moderator Page</u></h1>
      <br />
      {/* Unmoderated Articles */}
      <h1><u>Unmoderated Articles</u></h1>
      <ShowArticleList articles={unmoderatedArticles} moderationMode={true} />

      {/* Moderated Articles */}
      <h1><u>Accepted Articles</u></h1>
      <ShowArticleList articles={moderatedArticles.accepted} />

      <h1><u>Denied Articles</u></h1>
      <ShowArticleList articles={moderatedArticles.denied} />
    </div>
  );
}

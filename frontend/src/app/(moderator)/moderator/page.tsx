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
        // Use the correct environment variable for the backend URL
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
      <h1>Moderator Page</h1>

      {/* Unmoderated Articles */}
      <h2>Unmoderated Articles</h2>
      <ShowArticleList articles={unmoderatedArticles} moderationMode={true} />

      {/* Moderated Articles */}
      <h2>Accepted Articles</h2>
      <ShowArticleList articles={moderatedArticles.accepted} />

      <h2>Denied Articles</h2>
      <ShowArticleList articles={moderatedArticles.denied} />
    </div>
  );
}

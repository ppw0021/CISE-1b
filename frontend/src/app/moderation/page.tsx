"use client";

import React, { useEffect, useState } from "react";
import { Article } from "../components/Article";

const ModerationPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/articles");
        const data = await response.json();
        console.log("Fetched articles:", data); // Log the fetched data
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Show articles that haven't been moderated (i.e., isModerated is false or undefined)
  const unmoderatedArticles = articles.filter(
    (article) => !article.isModerated
  );

  // Log the unmoderated articles to verify the filtering
  console.log("Unmoderated articles:", unmoderatedArticles);

  // Function to handle accepting an article
  const handleAccept = async (articleId: string) => {
    try {
      const response = await fetch(`http://localhost:8082/api/articles/${articleId}/accept`, {
        method: "PATCH",
      });

      if (response.ok) {
        setArticles((prev) => 
          prev.map((article) =>
            article._id === articleId ? { ...article, isModerated: true } : article
          )
        );
      } else {
        console.error("Failed to accept article");
      }
    } catch (error) {
      console.error("Error accepting article:", error);
    }
  };

  // Function to handle denying an article
  const handleDeny = async (articleId: string) => {
    try {
      const response = await fetch(`http://localhost:8082/api/articles/${articleId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setArticles((prev) => prev.filter((article) => article._id !== articleId));
      } else {
        console.error("Failed to deny article");
      }
    } catch (error) {
      console.error("Error denying article:", error);
    }
  };

  if (loading) {
    return <p>Loading articles...</p>;
  }

  return (
    <div>
      <h1>Moderation Page</h1>
      {unmoderatedArticles.length > 0 ? (
        <table style={{ border: "1px solid black", width: "100%" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>Volume</th>
              <th>Number</th>
              <th>Pages</th>
              <th>DOI</th>
              <th>Updated Date</th>
              <th>Actions</th> {/* New column for buttons */}
            </tr>
          </thead>
          <tbody>
            {unmoderatedArticles.map((article) => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>{article.authors}</td>
                <td>{article.publisher}</td>
                <td>{article.year_of_publication}</td>
                <td>{article.volume || "N/A"}</td>
                <td>{article.number || "N/A"}</td>
                <td>{article.pages || "N/A"}</td>
                <td>{article.doi || "N/A"}</td>
                <td>{new Date(article.updated_date!).toLocaleString()}</td>
                <td>
                  <button 
                    onClick={() => handleAccept(article._id)} 
                    className="mr-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleDeny(article._id)} 
                    className="mr-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Deny
                  </button>
                </td> {/* Actions cell */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No unmoderated articles available for review.</p>
      )}
    </div>
  );
};

export default ModerationPage;

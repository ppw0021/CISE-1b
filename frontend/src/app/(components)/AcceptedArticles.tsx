"use client";
import React, { useState, useEffect } from 'react';
import { Article } from './Article'; // Import the Article type

const researchMethods = [
  'TDD', 'BDD', 'CI/CD', 'XP', 'Scrum', 'Kanban', 'DDD', 'SOA',
  'DevOps', 'Agile', 'PM', 'FDD', 'ATDD', 'CQRS', 'SRE', 'Refactoring'
];

export default function AcceptedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article/moderated?status=accepted`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error('Error fetching accepted articles:', error);
        setError('Failed to fetch accepted articles. Please try again later.');
      });
  }, []);

  const handleMethodChange = (articleId: string, method: string) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article._id === articleId ? { ...article, researchType: [method] } : article
      )
    );
  };

  const handleConfirmClick = (articleId: string) => {
    const article = articles.find(a => a._id === articleId);
    if (article) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ researchType: article.researchType }), // Send the selected research type
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update methodology');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Methodology updated:', data);
          setConfirmationMessage('Changes saved successfully!');
          setTimeout(() => setConfirmationMessage(null), 3000);
        })
        .catch((error) => {
          console.error('Error updating methodology:', error);
          setConfirmationMessage('Failed to save changes.');
          setTimeout(() => setConfirmationMessage(null), 3000);
        });
    }
  };

  const confirmArticle = (article: Article) => {
    if (article._id) {
      handleConfirmClick(article._id);
    } else {
      console.error('Article ID is not defined.');
    }
  };

  return (
    <div>
      <h1>Accepted Articles</h1>
      {confirmationMessage && <p style={{ color: 'green' }}>{confirmationMessage}</p>}
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {articles.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Authors</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Publisher</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>DOI</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Year of Publication</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Research Methodology</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article._id}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{article.title}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{article.authors?.join(', ')}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{article.publisher}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{article.doi}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{article.year_of_publication}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      <select 
                        id={`method-${article._id}`} 
                        onChange={(e) => {
                          if (article._id) {
                            handleMethodChange(article._id, e.target.value); 
                          }
                        }} 
                        defaultValue={article.researchType?.[0] || ""} // Use the selected research type or empty string
                      >
                        <option value="" disabled>Select Practice</option>
                        {researchMethods.map((method) => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {article._id ? (
                        <button 
                          onClick={() => confirmArticle(article)} 
                        >
                          Confirm
                        </button>
                      ) : (
                        <span>ID not available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No accepted articles found.</p>
          )}
        </div>
      )}
    </div>
  );
}

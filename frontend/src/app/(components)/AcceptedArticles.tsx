"use client";
import React, { useState, useEffect } from 'react';
import { Article } from './Article';  // Import the Article type

const researchMethods = [
  'TDD',       // Test-Driven Development
  'BDD',       // Behavior-Driven Development
  'CI/CD',     // Continuous Integration / Continuous Deployment
  'XP',        // Extreme Programming
  'Scrum',     // Agile Scrum Framework
  'Kanban',    // Kanban Methodology
  'DDD',       // Domain-Driven Design
  'SOA',       // Service-Oriented Architecture
  'DevOps',    // Development and Operations
  'Agile',     // Agile Methodology
  'PM',        // Pair Programming
  'FDD',       // Feature-Driven Development
  'ATDD',      // Acceptance Test-Driven Development
  'CQRS',      // Command Query Responsibility Segregation
  'SRE',       // Site Reliability Engineering
  'Refactoring'// Improving existing code without changing its behavior
];

export default function AcceptedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null); // State for confirmation message

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article/moderated?status=accepted`)  // Use the environment variable
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log fetched data
        setArticles(data);
      })
      .catch((error) => {
        console.error('Error fetching accepted articles:', error);
        setError('Failed to fetch accepted articles. Please try again later.'); // Set error message
      });
  }, []);

  const handleMethodChange = (articleId: string, method: string) => {
    // Update the article with the selected research methodology
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article._id === articleId ? { ...article, researchMethodology: [method] } : article
      )
    );
  };

  const handleConfirmClick = (articleId: string) => {
    // Optionally send the updated methodology to the backend
    const article = articles.find(a => a._id === articleId);
    if (article) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ researchMethodology: article.researchType }), // Use the correct field
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update methodology');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Methodology updated:', data);
          setConfirmationMessage('Changes saved successfully!'); // Set confirmation message
          // Clear the message after a few seconds
          setTimeout(() => {
            setConfirmationMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.error('Error updating methodology:', error);
          setConfirmationMessage('Failed to save changes.'); // Set error message
          // Clear the message after a few seconds
          setTimeout(() => {
            setConfirmationMessage(null);
          }, 3000);
        });
    }
  };

  const confirmArticle = (article: Article) => {
    console.log('Confirming article:', article); // Log the entire article object
  
    if (article._id) { // Ensure that _id is defined
      handleConfirmClick(article._id); // Call the confirm function with the _id
    } else {
      console.error('Article ID is not defined.'); // Log an error if _id is not available
    }
  };

  return (
    <div>
      <h1>Accepted Articles</h1>
      {confirmationMessage && ( // Show confirmation message if available
        <p style={{ color: 'green' }}>{confirmationMessage}</p>
      )}
      {error ? ( // Show error message if there's an error
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
                          if (article._id) { // Check if _id is defined
                            handleMethodChange(article._id, e.target.value); 
                          }
                        }} 
                        defaultValue=""
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
                          style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
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

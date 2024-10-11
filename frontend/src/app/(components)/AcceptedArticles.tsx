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

    // Optionally send the updated methodology to the backend
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${articleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ researchMethodology: [method] }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update methodology');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Methodology updated:', data);
      })
      .catch((error) => {
        console.error('Error updating methodology:', error);
      });
  };

  return (
    <div>
      <h1>Accepted Articles</h1>
      {error ? ( // Show error message if there's an error
        <p>{error}</p>
      ) : (
        <div>
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article._id}>
                <h3>{article.title}</h3>
                <p>{article.authors?.join(', ')}</p>
                <p>Publisher: {article.publisher}</p>
                <p>DOI: {article.doi}</p>
                <p>Year of Publication: {article.year_of_publication}</p>
                <label htmlFor={`method-${article._id}`}>Research Methodology:</label>
                <select 
                  id={`method-${article._id}`} 
                  onChange={(e) => {
                    if (article._id) { // Check if _id is defined
                      handleMethodChange(article._id, e.target.value); 
                    }
                  }} 
                  defaultValue=""
                >
                  <option value="" disabled>Select method</option>
                  {researchMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                <hr />
              </div>
            ))
          ) : (
            <p>No accepted articles found.</p>
          )}
        </div>
      )}
    </div>
  );
}

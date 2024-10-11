// frontend/src/app/(components)/articleCard.tsx
import React from 'react';
import { Article } from './Article';
import Link from 'next/link';

interface Props {
  article: Article;
  moderationMode?: boolean;
}

const ArticleCard: React.FC<Props> = ({ article, moderationMode = false }) => {
  const handleModeration = async (status: string) => {
    try {
      await fetch(`http://localhost:8082/api/article/${article._id}/moderate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moderated: true, status }),
      });
      alert(`Article ${status}`);
      // Trigger a refresh or update the list if necessary
    } catch (err) {
      console.error('Error moderating article: ', err);
    }
  };

  return (
    <div className='ArticleCard'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{article.title}</h5>
          <p className='card-text'>Authors: {article.authors}</p>
          <p className='card-text'>Journal: {article.publisher}</p>
          <p className='card-text'>Year: {article.year_of_publication}</p>
          <Link href={`/show-article/${article._id}`} className='btn btn-outline-info'>
            View Details
          </Link>

          {moderationMode && (
            <div className="mt-3">
              <button
                className='btn btn-outline-success mr-2'
                onClick={() => handleModeration('accepted')}
              >
                Accept
              </button>
              <button
                className='btn btn-outline-danger'
                onClick={() => handleModeration('denied')}
              >
                Deny
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

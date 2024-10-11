import React from 'react';
import { Article } from './Article';

interface Props {
  articles: Article[];
  moderationMode?: boolean;
  onAccept?: (article: Article) => void;  // Make onAccept optional
  onDeny?: (article: Article) => void;    // Make onDeny optional
}

const ShowArticleList: React.FC<Props> = ({ articles, moderationMode = false, onAccept, onDeny }) => {
  if (articles.length === 0) {
    return <p>There are no Article records!</p>;
  }

  return (
    <div className='ShowArticleList'>
      <div className='container'>
        <div className='row'>
          {/* You can add additional layout here if needed */}
        </div>
        <div className='table-responsive'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr className="bg-light">
                <th>Title</th>
                <th>Authors</th>
                <th>Publisher</th>
                <th>Year of Publication</th>
                <th>Volume</th>
                <th>Number</th>
                <th>Pages</th>
                <th>DOI</th>
                {moderationMode && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article._id || index}>
                  <td>{article.title}</td>
                  <td>{Array.isArray(article.authors) ? article.authors.join(', ') : article.authors}</td>
                  <td>{article.publisher}</td>
                  <td>{article.year_of_publication}</td>
                  <td>{article.volume}</td>
                  <td>{article.number}</td>
                  <td>{article.pages}</td>
                  <td>{article.doi}</td>
                  {moderationMode && (
                    <td>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => onAccept && onAccept(article)} // Check if onAccept is defined
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeny && onDeny(article)} // Check if onDeny is defined
                      >
                        Deny
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowArticleList;

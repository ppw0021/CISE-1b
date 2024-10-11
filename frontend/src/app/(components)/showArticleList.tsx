// frontend/src/app/(components)/showArticleList.tsx
import React, { useState, useEffect } from 'react';
import ArticleCard from './articleCard';
import { Article } from './Article';

interface Props {
  articles: Article[];
  moderationMode?: boolean;
}

const ShowArticleList: React.FC<Props> = ({ articles, moderationMode = false }) => {
  const articleList = articles.length === 0 
    ? 'There are no Article records!' 
    : articles.map((article, k) => (
        <ArticleCard 
          article={article} 
          key={k} 
          moderationMode={moderationMode} 
        />
      ));

  return (
    <div className='ShowArticleList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Articles List</h2>
          </div>
        </div>
        <div className='list'>
          {articleList}
        </div>
      </div>
    </div>
  );
};

export default ShowArticleList;

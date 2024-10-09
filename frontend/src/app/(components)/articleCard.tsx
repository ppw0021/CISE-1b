import React from 'react';
import { Article } from './Article';
import Link from 'next/link';

interface Props {
    article: Article;
}

function ArticleCard({ article }: Props) {
    return (
        <div className='ArticleCard'>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>{article.title}</h5>
                    <p className='card-text'>Authors: {article.authors}</p>
                    <p className='card-text'>Journal: {article.journalName}</p>
                    <p className='card-text'>Year: {article.year}</p>
                    <Link href={`/show-article/${article._id}`} className='btn btn-outline-info'>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;

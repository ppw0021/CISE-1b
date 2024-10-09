import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ArticleCard from './articleCard';
import { Article } from './Article';

function ShowArticleList() {
    const [Articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('http://localhost:8082/api/Articles')
            .then((res) => {
                return res.json();
            })
            .then((Articles) => {
                setArticles(Articles);
            })
            .catch((err) => {
                console.log('Error from ShowArticleList: ' + err);
            });
    }, []);

    const ArticleList =
        Articles.length === 0
            ? 'There are no Article records!'
            : Articles.map((Article, k) => <ArticleCard Article={Article} key={k} />);

    return (
        <div className='ShowArticleList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Articles List</h2>
                    </div>
                    <div className='col-md-11'>
                        <Link href='/create-Article' className='btn btn-outline-warning float-right'>
                            + Add New Article
                        </Link>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className='list'>{ArticleList}</div>
            </div>
        </div>
    );
}

export default ShowArticleList;

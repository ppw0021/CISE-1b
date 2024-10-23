'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Article, DefaultEmptyArticle } from './Article';
import Link from 'next/link';

function ShowArticleDetails() {
    const [Article, setArticle] = useState<Article>(DefaultEmptyArticle);
    const id = useParams<{ id: string }>().id;

    useEffect(() => {
        fetch(`http://localhost:8082/api/Articles/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setArticle(json);
            })
            .catch((err) => {
                console.log('Error from ShowArticleDetails: ' + err);
            });
    }, [id]);

    const onDeleteClick = (id: string) => {
        fetch(`http://localhost:8082/api/Articles/${id}`, { method: 'DELETE' })
            .then((res) => {
                console.log(res);
                window.location.href = '/';
            })
            .catch((err) => {
                console.log('Error from ShowArticleDetails_deleteClick: ' + err);
            });
    };

    const ArticleItem = (
        <div>
            <table className='table table-hover table-dark table-striped table-bordered'>
                <tbody>
                    <tr>
                        <th scope='row'>1</th>
                        <td>Title</td>
                        <td>{Article.title}</td>
                    </tr>
                    <tr>
                        <th scope='row'>2</th>
                        <td>Authors</td>
                        <td>{Article.authors}</td>
                    </tr>
                    <tr>
                        <th scope='row'>3</th>
                        <td>Journal Name</td>
                        <td>{Article.publisher}</td>
                    </tr>
                    <tr>
                        <th scope='row'>4</th>
                        <td>Year</td>
                        <td>{Article.year_of_publication}</td>
                    </tr>
                    <tr>
                        <th scope='row'>5</th>
                        <td>Volume</td>
                        <td>{Article.volume}</td>
                    </tr>
                    <tr>
                        <th scope='row'>6</th>
                        <td>Number</td>
                        <td>{Article.number}</td>
                    </tr>
                    <tr>
                        <th scope='row'>7</th>
                        <td>Pages</td>
                        <td>{Article.pages}</td>
                    </tr>
                    <tr>
                        <th scope='row'>8</th>
                        <td>DOI</td>
                        <td>{Article.doi}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className='ShowArticleDetails'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-10 m-auto'>
                        <br /> <br />
                        <Link href='/' className='btn btn-outline-warning float-left'>
                            Show Article List
                        </Link>
                    </div>
                    <br />
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Article&apos;s Record</h1>
                        <p className='lead text-center'>View Article&apos;s Info</p>
                        <hr /> <br />
                    </div>
                    <div className='col-md-10 m-auto'>{ArticleItem}</div>
                    <div className='col-md-6 m-auto'>
                        <button
                            type='button'
                            className='btn btn-outline-danger btn-lg btn-block'
                            onClick={() => {
                                onDeleteClick(Article._id || "");
                            }}
                        >
                            Delete Article
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowArticleDetails;

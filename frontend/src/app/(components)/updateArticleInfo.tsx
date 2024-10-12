import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultEmptyArticle } from './Article';
import Link from 'next/link';

function UpdateArticleInfo() {
    const [Article, setArticle] = useState<Article>(DefaultEmptyArticle);
    const id = useParams<{ id: string }>().id;
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:8082/api/Articles/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setArticle(json);
            })
            .catch((err) => {
                console.log('Error from UpdateArticleInfo: ' + err);
            });
    }, [id]);

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...Article, [event.target.name]: event.target.value });
    };

    const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setArticle({ ...Article, [event.target.name]: event.target.value });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`http://localhost:8082/api/Articles/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Article),
        })
            .then((res) => {
                router.push(`/show-article/${id}`);
            })
            .catch((err) => {
                console.log('Error from UpdateArticleInfo: ' + err);
            });
    };

    return (
        <div className='UpdateArticleInfo'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
                        <Link href='/' className='btn btn-outline-warning float-left'>
                            Show Article List
                        </Link>
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Edit Article</h1>
                        <p className='lead text-center'>Update Article's Info</p>
                    </div>
                </div>
                <div className='col-md-8 m-auto'>
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor='title'>Title</label>
                            <input
                                type='text'
                                placeholder='Title of the Article'
                                name='title'
                                className='form-control'
                                value={Article.title}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='authors'>Authors</label>
                            <input
                                type='text'
                                placeholder='Authors'
                                name='authors'
                                className='form-control'
                                value={Article.authors}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='journalName'>Journal Name</label>
                            <input
                                type='text'
                                placeholder='Journal Name'
                                name='journalName'
                                className='form-control'
                                value={Article.journalName}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='year'>Year</label>
                            <input
                                type='number'
                                placeholder='Year'
                                name='year'
                                className='form-control'
                                value={Article.year?.toString() || ''}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='volume'>Volume</label>
                            <input
                                type='text'
                                placeholder='Volume'
                                name='volume'
                                className='form-control'
                                value={Article.volume}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='number'>Number</label>
                            <input
                                type='text'
                                placeholder='Number'
                                name='number'
                                className='form-control'
                                value={Article.number}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='pages'>Pages</label>
                            <input
                                type='text'
                                placeholder='Pages'
                                name='pages'
                                className='form-control'
                                value={Article.pages}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='doi'>DOI</label>
                            <input
                                type='text'
                                placeholder='DOI'
                                name='doi'
                                className='form-control'
                                value={Article.doi}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <button
                            type='submit'
                            className='btn btn-outline-info btn-lg btn-block'
                        >
                            Update Article
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateArticleInfo;

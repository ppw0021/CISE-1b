import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Article, DefaultEmptyArticle } from "./Article";

const CreateArticleComponent = () => {
    const navigate = useRouter();
    const [Article, setArticle] = useState<Article>(DefaultEmptyArticle);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...Article, [event.target.name]: event.target.value });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(Article);
        
        fetch("http://localhost:8082/api/Articles", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Article)
        })
            .then((res) => {
                console.log(res);
                setArticle(DefaultEmptyArticle);
                // Push to /
                navigate.push("/");
            })
            .catch((err) => {
                console.log('Error from CreateArticle: ' + err);
            });
    };

    return (
        <div className="CreateArticle">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                        <Link href="/" className="btn btn-outline-warning float-left">
                            Show Article List
                        </Link>
                    </div>
                    <div className="col-md-10 m-auto">
                        <h1 className="display-4 text-center">Add Article</h1>
                        <p className="lead text-center">Create new Article</p>
                        <form noValidate onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Title of the Article"
                                    name="title"
                                    className="form-control"
                                    value={Article.title}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="ISBN"
                                    name="isbn"
                                    className="form-control"
                                    value={Article.isbn}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Author"
                                    name="author"
                                    className="form-control"
                                    value={Article.author}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Describe this Article"
                                    name="description"
                                    className="form-control"
                                    value={Article.description}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="date"
                                    placeholder="Published Date"
                                    name="published_date"
                                    className="form-control"
                                    value={Article.published_date?.toString()}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Publisher of this Article"
                                    name="publisher"
                                    className="form-control"
                                    value={Article.publisher}
                                    onChange={onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateArticleComponent;

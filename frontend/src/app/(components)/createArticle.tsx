"use client";

import { useState, useEffect } from 'react';
import "../globals.css"; // Import global styles
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "./Article";

const CreateArticleComponent = () => {
    const navigate = useRouter();
    const [Article, setArticle] = useState<Article>(DefaultEmptyArticle);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [allowedAccess, setAllowedAccess] = useState(true); // Replace with your actual logic
    const [isLoggedIn, setLoggedInStatus] = useState<boolean | null>(true);
    const [isUserAdmin, setAdminStatus] = useState<boolean | null>(false);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        const isAdmin = localStorage.getItem("is_admin");
        if (token === null) {
            setLoggedInStatus(false);
            setAdminStatus(false);
        } else {
            setLoggedInStatus(true);
            setAdminStatus(isAdmin === "true");
        }
    }, []);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...Article, [event.target.name]: event.target.value });
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value ? parseInt(event.target.value) : 0; // Set to 0 if empty
        setArticle({ ...Article, year: value });
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(Article);
    
        fetch("http://localhost:8082/api/article/create", { // Change this line
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Article)
        })    
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to submit the article.');
                }
                setArticle(DefaultEmptyArticle);
                setSuccessMessage("Article submitted successfully!");
                navigate.push("/");
            })
            .catch((err) => {
                console.log('Error from CreateArticle: ' + err);
                setErrorMessage('Error submitting article. Please try again.');
            });
    };

    const logOutClicked = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("is_admin");
        setLoggedInStatus(false);
        setAdminStatus(false);
        navigate.push("/");
        window.location.reload();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="shadow-lg">
                <h1 className="mb-2">SPEED Application</h1>
                <nav>
                    <Link href="/">
                        <button aria-label="Home" className="mr-2">
                            Home
                        </button>
                    </Link>
                    {!isLoggedIn && (
                        <Link href="/login">
                            <button aria-label="Login" className="mr-2">
                                Login
                            </button>
                        </Link>
                    )}
                    {isLoggedIn && (
                        <>
                            <button aria-label="Logout" className="mr-2" onClick={logOutClicked}>
                                Logout
                            </button>
                            <Link href="/search">
                                <button aria-label="Search" className="mr-2">
                                    Search
                                </button>
                            </Link>
                            <Link href="/browse">
                                <button aria-label="Browse" className="mr-2">
                                    Browse
                                </button>
                            </Link>
                            {/* Link to Create Article */}
                            <Link href="/create-article">
                                <button aria-label="Create Article" className="mr-2">
                                    Create Article
                                </button>
                            </Link>
                            {isUserAdmin && (
                                <Link href="/admin">
                                    <button aria-label="Admin Panel" className="mr-2">
                                        Admin Panel
                                    </button>
                                </Link>
                            )}
                        </>
                    )}
                </nav>
            </header>
            <main className="flex-grow p-4">
                <div className="flex items-center justify-center bg-gray-100">
                    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-xl">
                        <h2 className="text-2xl font-bold mb-4">Submit Journal Article</h2>
                        {allowedAccess ? (
                            <>
                                {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
                                {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

                                <form onSubmit={onSubmit}>
                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Title:</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={Article.title}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the title"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Authors:</label>
                                        <input
                                            type="text"
                                            name="authors"
                                            value={Article.authors}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the authors"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Journal Name:</label>
                                        <input
                                            type="text"
                                            name="journalName"
                                            value={Article.journalName}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the journal name"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Year:</label>
                                        <input
                                            type="number"
                                            name="year"
                                            value={Article.year || ''}
                                            onChange={handleYearChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the year"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Volume:</label>
                                        <input
                                            type="text"
                                            name="volume"
                                            value={Article.volume}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the volume"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Number:</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={Article.number}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the number"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Pages:</label>
                                        <input
                                            type="text"
                                            name="pages"
                                            value={Article.pages}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the page numbers (e.g., 10-20)"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">DOI:</label>
                                        <input
                                            type="text"
                                            name="doi"
                                            value={Article.doi}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the DOI"
                                        />
                                    </div>

                                    <button
                                        type="submit" // Set type to "submit"
                                        disabled={!Article.title || !Article.authors || !Article.journalName || !Article.year || !Article.pages || !Article.doi}
                                        className={`px-4 py-2 ${!Article.title || !Article.authors || !Article.journalName || !Article.year || !Article.pages || !Article.doi ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded hover:bg-blue-700`}
                                    >
                                        Submit
                                    </button>
                                </form>

                                <Link href={"/"}>
                                    <button className="ml-2 text-blue-500 hover:underline">
                                        Return
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <h1 className="text-lg font-bold">Please login to submit an article.</h1>
                        )}
                    </div>
                </div>
            </main>
            <footer className="shadow-lg">
                <p>Group Number 7: Adam, Declan, and Joel.</p>
            </footer>
        </div>
    );
};

export default CreateArticleComponent;

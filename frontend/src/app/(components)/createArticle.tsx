"use client";

import { useState, useEffect } from 'react';
import "../globals.css"; // Import global styles
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article as ArticleType, DefaultEmptyArticle } from "./Article"; // Rename import for clarity

const CreateArticleComponent = () => {
    const navigate = useRouter();
    const [articleState, setArticle] = useState<ArticleType>(DefaultEmptyArticle); // Renamed state variable
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
        setArticle({ ...articleState, [event.target.name]: event.target.value });
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value ? parseInt(event.target.value) : 0; // Set to 0 if empty
        setArticle({ ...articleState, year: value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(articleState); // Check the console to see the structure of Article
    
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(articleState)
            });

            if (!res.ok) {
                throw new Error('Failed to submit the article.');
            }

            const data = await res.json(); // Ensure to parse the response
            console.log("Response from server:", data); // Log the server response
            setArticle(DefaultEmptyArticle);
            setSuccessMessage("Article submitted successfully!");
            navigate.push("/");
        } catch (err) {
            console.log('Error from CreateArticle: ', err);
            setErrorMessage('Error submitting article. Please try again.');
        }
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
                                            value={articleState.title}
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
                                            value={articleState.authors}
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
                                            value={articleState.journalName}
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
                                            value={articleState.year || ''}
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
                                            value={articleState.volume}
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
                                            value={articleState.number}
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
                                            value={articleState.pages}
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
                                            value={articleState.doi}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the DOI"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!articleState.title || !articleState.authors || !articleState.journalName || !articleState.year || !articleState.pages || !articleState.doi}
                                        className={`px-4 py-2 ${!articleState.title || !articleState.authors || !articleState.journalName || !articleState.year || !articleState.pages || !articleState.doi ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white rounded`}
                                    >
                                        Submit Article
                                    </button>
                                </form>
                            </>
                        ) : (
                            <p>You do not have access to this page.</p>
                        )}
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; {new Date().getFullYear()} SPEED Application</p>
            </footer>
        </div>
    );
};

export default CreateArticleComponent;

import { useState, useEffect } from 'react';
import "../globals.css"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article as ArticleType, DefaultEmptyArticle } from "./Article";

const CreateArticleComponent = () => {
    const router = useRouter();
    const [articleState, setArticle] = useState<ArticleType>(DefaultEmptyArticle); 
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [allowedAccess, setAllowedAccess] = useState(true); 
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
        const { name, value } = event.target;
        setArticle((prevState) => ({
            ...prevState,
            [name]: name === 'year' || name === 'volume' || name === 'number' || name === 'pages'
                ? parseInt(value) || null
                : value,
        }));
    };

    const handleAuthorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle((prevState) => ({
            ...prevState,
            authors: event.target.value.split(","),
        }));
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(articleState) 
            });
    
            if (!res.ok) {
                throw new Error('Failed to submit the article.');
            }
    
            const data = await res.json(); 
            console.log("Response from server:", data); 
            setArticle(DefaultEmptyArticle);
            setSuccessMessage("Article submitted successfully!");
            router.push("/");
        } catch (err) {
            console.log('Error from CreateArticle: ', err);
            setErrorMessage('Error submitting article. Please try again.');
        }
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
                            <button aria-label="Logout" className="mr-2" onClick={() => {/* Logout Logic */}}>
                                Logout
                            </button>
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
                        <h2 className="text-2xl font-bold mb-4">Submit Article</h2>
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
                                        <label className="font-semibold block mb-1">Authors (comma separated):</label>
                                        <input
                                            type="text"
                                            name="authors"
                                            value={articleState.authors?.join(", ")}
                                            onChange={handleAuthorsChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the authors"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Publisher:</label>
                                        <input
                                            type="text"
                                            name="publisher"
                                            value={articleState.publisher}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the publisher name"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Year of Publication:</label>
                                        <input
                                            type="number"
                                            name="year"
                                            value={articleState.year || ''}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the year"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Volume:</label>
                                        <input
                                            type="text"
                                            name="volume"
                                            value={articleState.volume || ""}
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
                                            value={articleState.number || ""}
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
                                            value={articleState.pages || ""}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the pages"
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
                                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Submit Article
                                    </button>
                                </form>
                            </>
                        ) : (
                            <p>You are not allowed to submit articles.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateArticleComponent;

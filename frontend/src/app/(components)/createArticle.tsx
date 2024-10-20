import { useState, useEffect } from 'react';
import "../globals.css"; 
import { Article as ArticleType, DefaultEmptyArticle } from "./Article";

const CreateArticleComponent = () => {
    const [articleState, setArticle] = useState<ArticleType>({
        ...DefaultEmptyArticle,
        authors: [] // Initialize authors as an empty array
    }); 
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
    }, []);
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setArticle((prevState) => ({
            ...prevState,
            [name]: name === 'year_of_publication' || name === 'volume' || name === 'number' || name === 'pages'
                ? parseInt(value) || null
                : value,
        }));
    };

    const handleAuthorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle((prevState) => ({
            ...prevState,
            authors: event.target.value.split(",").map(author => author.trim()),
        }));
    };

    const validateForm = () => {
        if (!articleState.title?.trim()) {
            setErrorMessage("Title is required.");
            return false;
        }
        if (!articleState.authors || articleState.authors.length === 0 || articleState.authors[0] === '') {
            setErrorMessage("At least one author is required.");
            return false;
        }
        if (!articleState.publisher?.trim()) {
            setErrorMessage("Publisher is required.");
            return false;
        }
        
        // Validate year of publication
        if (articleState.year_of_publication === undefined || articleState.year_of_publication === null) {
            setErrorMessage("Year of publication is required.");
            return false;
        }
    
        // Validate volume
        if (articleState.volume === undefined || articleState.volume === null) {
            setErrorMessage("Volume is required.");
            return false;
        }
    
        // Validate number
        if (articleState.number === undefined || articleState.number === null) {
            setErrorMessage("Number is required.");
            return false;
        }
    
        // Validate pages
        if (articleState.pages === undefined || articleState.pages === null) {
            setErrorMessage("Pages are required.");
            return false;
        }
    
        // Validate DOI
        if (!articleState.doi?.trim()) {
            setErrorMessage("DOI is required.");
            return false;
        }
    
        setErrorMessage(""); // Clear any previous error messages
        return true; // All validations passed
    };
    
    const checkForDuplicateArticle = async (title: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article/exists?title=${encodeURIComponent(title)}`);
            if (!res.ok) {
                throw new Error('Failed to check for duplicates.');
            }
            const exists = await res.json();
            return exists.exists; // Assume your backend returns { exists: true/false }
        } catch (error) {
            console.error('Error checking for duplicates:', error);
            setErrorMessage('Error checking for duplicates. Please try again.');
            return false;
        }
    };
    
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!validateForm()) return; 
        
        const isDuplicate = await checkForDuplicateArticle(articleState.title || ""); 
        if (isDuplicate) {
            setErrorMessage("This article has already been entered into the SPEED database.");
            return;
        }
    
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
            setArticle({
                ...DefaultEmptyArticle,
                authors: [] // Reset authors back to an empty array
            });
            setSuccessMessage("Article submitted successfully!");
            alert("Article has been submitted successfully!");
        } catch (err) {
            console.log('Error from CreateArticle: ', err);
            setErrorMessage('Error submitting article. Please try again.');
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow p-4">
                <div className="flex items-center justify-center bg-gray-100">
                    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-xl">
                        <h2 className="text-2xl font-bold mb-4">Submit Article</h2>
                        {true ? (
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
                                            value={(articleState.authors || []).join(", ")}
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
                                            name="year_of_publication"
                                            value={articleState.year_of_publication || ""}
                                            onChange={onChange}
                                            className="border p-2 rounded w-full"
                                            placeholder="Enter the year of publication"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-semibold block mb-1">Volume:</label>
                                        <input
                                            type="number"
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
                                            type="number"
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
                                            type="number"
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
                                        className="bg-blue-500 text-white p-2 rounded"
                                    >
                                        Submit Article
                                    </button>
                                </form>
                            </>
                        ) : (
                            <p className="text-red-500">You do not have permission to access this section.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateArticleComponent;

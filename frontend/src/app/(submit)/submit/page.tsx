"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SubmitterPage() {
    const [allowedAccess, setAccess] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [authors, setAuthors] = useState<string>('');
    const [journalName, setJournalName] = useState<string>('');
    const [year, setYear] = useState<string>('2024');
    const [volume, setVolume] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [pages, setPages] = useState<string>('');
    const [doi, setDoi] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            setAccess(false);
        } else {
            setAccess(true);
        }
    }, []);

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d{0,4}$/.test(e.target.value)) {
            setYear(e.target.value);
        }
    }

    const handleSubmit = async () => {
        setErrorMessage('');
        setSuccessMessage('');
    
        if (!title || !authors || !journalName || !year || !pages || !doi) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }
    
        // Construct the article data object to send to the backend
        const articleData = {
            title,
            authors: authors.split(',').map(author => author.trim()), // Split authors by comma
            publisher: journalName,
            year_of_publication: parseInt(year, 10), // Convert year to number
            volume: volume ? parseInt(volume, 10) : null, // Parse volume if it exists
            number: number ? parseInt(number, 10) : null, // Parse number if it exists
            pages: parseInt(pages, 10), // Convert pages to number
            doi // Use DOI directly
        };
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
            });
    
            if (response.ok) {
                setSuccessMessage("Article submitted successfully!");
                // Clear form fields
                setTitle('');
                setAuthors('');
                setJournalName('');
                setYear('2024');
                setVolume('');
                setNumber('');
                setPages('');
                setDoi('');
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "An error occurred while submitting the article.");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to submit the article. Please try again.");
        }
    };
    
    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Submit Journal Article</h2>
                {allowedAccess ? (
                    <>
                        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
                        {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

                        <div className="mb-2">
                            <label className="font-semibold block mb-1">Title:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the title"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="font-semibold block mb-1">Authors:</label>
                            <input
                                type="text"
                                value={authors}
                                onChange={(e) => setAuthors(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the authors"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="font-semibold block mb-1">Journal Name:</label>
                            <input
                                type="text"
                                value={journalName}
                                onChange={(e) => setJournalName(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the journal name"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="font-semibold block mb-1">Year:</label>
                            <input
                                type="number"
                                value={year}
                                onChange={handleYearChange}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the year"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="font-semibold block mb-1">Volume:</label>
                            <input
                                type="text"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the volume"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="font-semibold block mb-1">Number:</label>
                            <input
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the number"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="font-semibold block mb-1">Pages:</label>
                            <input
                                type="text"
                                value={pages}
                                onChange={(e) => setPages(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the page numbers (e.g., 10-20)"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="font-semibold block mb-1">DOI:</label>
                            <input
                                type="text"
                                value={doi}
                                onChange={(e) => setDoi(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the DOI"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!title || !authors || !journalName || !year || !pages || !doi}
                            className={`px-4 py-2 ${!title || !authors || !journalName || !year || !pages || !doi ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded hover:bg-blue-700`}
                        >
                            Submit
                        </button>

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
    );
}

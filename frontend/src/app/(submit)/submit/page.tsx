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

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token == null || token === "") {
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

    const handleSubmit = () => {
        if (title && authors && journalName && year) {
            // Submit form logic here (e.g., API call)
            console.log({
                title,
                authors,
                journalName,
                year,
                volume,
                number,
                pages,
                doi
            });
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Submit Journal Article</h2>
                {allowedAccess ? (
                    <>
                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Title:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the title"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Authors:</label>
                            <input
                                type="text"
                                value={authors}
                                onChange={(e) => setAuthors(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the authors"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Journal Name:</label>
                            <input
                                type="text"
                                value={journalName}
                                onChange={(e) => setJournalName(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the journal name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Year:</label>
                            <input
                                type="number"
                                value={year}
                                onChange={handleYearChange}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the year"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Volume:</label>
                            <input
                                type="text"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the volume"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Number:</label>
                            <input
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the number"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Pages:</label>
                            <input
                                type="text"
                                value={pages}
                                onChange={(e) => setPages(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter the page numbers (e.g., 10-20)"
                            />
                        </div>

                        <div className="mb-4">
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
                            disabled={!title || !authors || !journalName || !year}
                            className={`px-4 py-2 ${!title || !authors || !journalName || !year ? 'bg-gray-400' : 'bg-blue'} text-white rounded hover:bg-blue`}
                        >
                            Submit
                        </button>

                        <Link href={"/"}>
                            <button className={"ml-2"}>
                                Return
                            </button>
                        </Link>
                    </>
                ) : (
                    <h1 className="text-lg font-bold">Please login.</h1>
                )}
            </div>
        </div>
    );
}

"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Article {
    _id: string;
    title: string;
    year_of_publication: number;
    journal_or_conference: string;
    se_practice: string;
    claim: string;
    evidence_result: string;
    research_type: string;
    participant_type: string;
    authors: string[];
    databases?: string[]; // Optional field for databases
    created_at: string;
    updated_at: string;
}

export default function AdminPage() {
    const [allowedAccess, setAccess] = useState<boolean>(true);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const isAdmin = localStorage.getItem("is_admin");
        if (isAdmin === "true") {
            setAccess(true);
        } else {
            setAccess(false);
        }
    }, []);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
                const response = await fetch(apiUrl + '/revarticle');
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
            setLoading(false);
        };

        fetchArticles();
    }, []);

    const handleDelete = async (_id: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await fetch(apiUrl + `/revarticle/${_id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete article');
            }
            setArticles(articles.filter(article => article._id !== _id));
        } catch (error) {
            if (error instanceof Error) {
                console.error('Failed to delete article', error.message);
            } else {
                console.error('An unknown error occurred while deleting article');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white shadow-2xl rounded-lg p-4 w-full h-full max-w-screen text-center overflow-hidden">
        {allowedAccess ? (
            <>
                <h1 className="text-2xl font-bold mb-4">Reviewed Articles</h1>
                {loading ? (
                    <p>Loading articles...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="overflow-auto max-h-full max-w-full">
                        <table className="min-w-full bg-white table-auto text-sm">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-2">Title</th>
                                            <th className="border border-gray-300 px-4 py-2">Year</th>
                                            <th className="border border-gray-300 px-4 py-2">Journal/Conference</th>
                                            <th className="border border-gray-300 px-4 py-2">SE Practice</th>
                                            <th className="border border-gray-300 px-4 py-2">Claim</th>
                                            <th className="border border-gray-300 px-4 py-2">Evidence Result</th>
                                            <th className="border border-gray-300 px-4 py-2">Research Type</th>
                                            <th className="border border-gray-300 px-4 py-2">Participant Type</th>
                                            <th className="border border-gray-300 px-4 py-2">Authors</th>
                                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                                            <th className="border border-gray-300 px-4 py-2">Updated At</th>
                                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {articles.map(article => (
                                            <tr key={article.title} className="bg-gray-50">
                                                <td className="border border-gray-300 px-4 py-2">{article.title}</td>
                                                <td className="border border-gray-300 px-4 py-2">{article.year_of_publication}</td>
                                                <td className="border border-gray-300 px-4 py-2">{article.journal_or_conference}</td>
                                                <td className="border border-gray-300 px-4 py-2">{article.se_practice}</td>
                                                <td className="border border-gray-300 px-4 py-2">{article.claim}</td>
                                                <td className="border border-gray-300 px-4 py-2">{article.evidence_result}</td>
                                                <td className="border border-gray-300 px-4 py-2">{article.research_type}</td>
                                                <td className="border border-gray-300 px-4 py-2">{article.participant_type}</td>
                                                <td className="border border-gray-300 px-4 py-2">{article.authors.join(', ')}</td>
                                                <td className="border border-gray-300 px-4 py-2">{new Date(article.created_at).toLocaleDateString()}</td>
                                                <td className="border border-gray-300 px-4 py-2">{new Date(article.updated_at).toLocaleDateString()}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <button
                                                        onClick={() => handleDelete(article._id)}
                                                         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <Link href="/admin">
                            <button className="mt-4 px-4 py-2">
                                Return
                            </button>
                        </Link>
                    </>
                ) : (
                    <p className="text-red-500">Access denied.</p>
                )}
            </div>
        </div >
    );
}
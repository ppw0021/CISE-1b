"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Article {
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
    one_star_reviews: number;
    two_star_reviews: number;
    three_star_reviews: number;
    four_star_reviews: number;
    five_star_reviews: number;
}

export default function BrowsePage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hoverRatings, setHoverRatings] = useState<{ [key: string]: number }>({});
    const [rated, setRated] = useState<{ [key: string]: boolean }>({});

    const handleMouseEnter = (title: string, num: number) => {
        if (rated[title]) {
            return;
        }
        setHoverRatings((prev) => ({ ...prev, [title]: num }));
    }

    const handleMouseLeave = (title: string) => {
        if (rated[title]) {
            return;
        }
        setHoverRatings((prev) => ({ ...prev, [title]: 0 }));
    }

    const rateArticle = async (title: string, num: number) => {
        if (rated[title]) {
            return;
        }
        setRated((prev) => ({ ...prev, [title]: true }));
        setHoverRatings((prev) => ({ ...prev, [title]: num }));

        try {
            const payload = {
                articleName: title,
                rating: num
            }
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await fetch(apiUrl + `/revarticle/addrating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new Error("Failed to fetch user existence");
            }

            const data = await response.json();
            console.log(data);
            if (!data.exists && data.success) {
                //Email exists and password valid!
                console.log("Rate Complete");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const averageRating = (dataIncoming: Article) => {
        const total = ((dataIncoming.one_star_reviews ?? 0) * 1)
            + ((dataIncoming.two_star_reviews ?? 0) * 2)
            + ((dataIncoming.three_star_reviews ?? 0) * 3)
            + ((dataIncoming.four_star_reviews ?? 0) * 4)
            + ((dataIncoming.five_star_reviews ?? 0) * 5);
        const totalCount = (dataIncoming.one_star_reviews ?? 0)
            + (dataIncoming.two_star_reviews ?? 0)
            + (dataIncoming.three_star_reviews ?? 0)
            + (dataIncoming.four_star_reviews ?? 0)
            + (dataIncoming.five_star_reviews ?? 0);
        const average = total / totalCount;
        if (Number.isNaN(average)) {
            return "No reviews";
        }
        return average.toFixed(1) + `★ (${totalCount})`;
    }

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

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-2xl rounded-lg p-4 w-full h-full max-w-screen text-center overflow-hidden">
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
                                        <th className="border border-gray-300 px-4 py-2">Average Rating</th>
                                        <th className="border border-gray-300 px-4 py-2">Rate Article   </th>
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
                                            <td className="border border-gray-300 px-4 py-2">{averageRating(article)}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex flex-nowrap">
                                                    <button className='p-0 bg-gray-50 text-black shadow-none hover:bg-gray-50'
                                                        onMouseEnter={() => handleMouseEnter(article.title, 1)}
                                                        onMouseLeave={() => handleMouseLeave(article.title)}
                                                        onClick={() => rateArticle(article.title, 1)}>
                                                        {(hoverRatings[article.title] >= 1) ? '★' : '☆'}
                                                    </button>
                                                    <button className='p-0 bg-gray-50 text-black shadow-none hover:bg-gray-50'
                                                        onMouseEnter={() => handleMouseEnter(article.title, 2)}
                                                        onMouseLeave={() => handleMouseLeave(article.title)}
                                                        onClick={() => rateArticle(article.title, 2)}>
                                                        {(hoverRatings[article.title] >= 2) ? '★' : '☆'}
                                                    </button>
                                                    <button className='p-0 bg-gray-50 text-black shadow-none hover:bg-gray-50'
                                                        onMouseEnter={() => handleMouseEnter(article.title, 3)}
                                                        onMouseLeave={() => handleMouseLeave(article.title)}
                                                        onClick={() => rateArticle(article.title, 3)}>
                                                        {(hoverRatings[article.title] >= 3) ? '★' : '☆'}
                                                    </button>
                                                    <button className='p-0 bg-gray-50 text-black shadow-none hover:bg-gray-50'
                                                        onMouseEnter={() => handleMouseEnter(article.title, 4)}
                                                        onMouseLeave={() => handleMouseLeave(article.title)}
                                                        onClick={() => rateArticle(article.title, 4)}>

                                                        {(hoverRatings[article.title] >= 4) ? '★' : '☆'}
                                                    </button>
                                                    <button className='p-0 bg-gray-50 text-black shadow-none hover:bg-gray-50'
                                                        onMouseEnter={() => handleMouseEnter(article.title, 5)}
                                                        onMouseLeave={() => handleMouseLeave(article.title)}
                                                        onClick={() => rateArticle(article.title, 5)}>
                                                        {(hoverRatings[article.title] >= 5) ? '★' : '☆'}
                                                    </button>
                                                </div>
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
            </div>
        </div >
    );
}
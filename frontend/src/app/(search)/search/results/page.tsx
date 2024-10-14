"use client";
import { Suspense } from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

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
    created_at: string;
    updated_at: string;
}

const SearchResults = () => {
    const [allowedAccess, setAccess] = useState<boolean>(true);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const methodToFilter = searchParams.get('method'); // Get the method from query params
    const [selectedResults, setSelectedResults] = useState<string[]>(['Title', 'Year', 'Journal/Conference', 'SE Practice', 'Claim', 'Evidence Result', 'Research Type', 'Participant Type', 'Authors', 'Created At', 'Updated At']);
    const fromYearToFilter = searchParams.get('fromYear');
    const toYearToFilter = searchParams.get('toYear');

    useEffect(() => {
        setAccess(true);
        /*
        const isAdmin = localStorage.getItem("is_admin");
        if (isAdmin === "true") {
            setAccess(true);
        } else {
            setAccess(false);
        }*/
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
                console.log(`Parameters: method: ${methodToFilter} fromYear: ${fromYearToFilter} toYear ${toYearToFilter}`);
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
    }, [fromYearToFilter, methodToFilter, toYearToFilter]); // Add missing dependencies

    const filteredArticles = articles.filter(article => {
        const articleYear = article.year_of_publication; // Replace this with the actual property name for the year

        const fromYear = fromYearToFilter !== null ? parseInt(fromYearToFilter) : Number.MIN_SAFE_INTEGER;
        const toYear = toYearToFilter !== null ? parseInt(toYearToFilter) : Number.MAX_SAFE_INTEGER;

        // Check if the article matches the method and falls within the year range
        return (
            article.se_practice === methodToFilter &&
            articleYear >= fromYear &&
            articleYear <= toYear
        );
    });

    const results: string[] = ['Title', 'Year', 'Journal/Conference', 'SE Practice', 'Claim', 'Evidence Result', 'Research Type', 'Participant Type', 'Authors', 'Created At', 'Updated At'];

    const handleCheckboxChange = (result: string) => {
        if (selectedResults.includes(result)) {
            setSelectedResults(selectedResults.filter(r => r !== result));
        } else {
            setSelectedResults([...selectedResults, result]);
            console.log(selectedResults)
        }
    }

    const resultKeyMap: { [key: string]: keyof Article } = {
        Title: 'title',
        Year: 'year_of_publication',
        'Journal/Conference': 'journal_or_conference',
        'SE Practice': 'se_practice',
        Claim: 'claim',
        'Evidence Result': 'evidence_result',
        'Research Type': 'research_type',
        'Participant Type': 'participant_type',
        Authors: 'authors',
        'Created At': 'created_at',
        'Updated At': 'updated_at',
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-2xl rounded-lg p-4 w-full h-full max-w-screen text-center overflow-hidden">
                {allowedAccess ? (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Reviewed Articles for {methodToFilter}</h1>
                        <div className="mb-4">
                            {results.map(result => (
                                <label key={result} className="mr-4">
                                    <input
                                        type="checkbox"
                                        name="result"
                                        value={result}
                                        checked={selectedResults.includes(result)}
                                        onChange={() => handleCheckboxChange(result)}
                                    />
                                    {result}
                                </label>
                            ))}

                        </div>
                        {loading ? (
                            <p>Loading articles...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            selectedResults.length > 0 && (
                                <div className="overflow-auto max-h-full max-w-full">
                                    <table className="min-w-full bg-white table-auto text-sm">
                                        <thead>
                                            <tr>
                                                {selectedResults.map(result => (
                                                    <th key={result} className="border border-gray-300 px-4 py-2">{result}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredArticles.map((article, index) => (
                                                <tr key={index}>
                                                    {selectedResults.map(result => (
                                                        <td key={result} className="border border-gray-300 px-4 py-2"> {article[resultKeyMap[result]]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        )}
                        <Link href="/search">
                            <button className="mt-4 px-4 py-2">
                                Return
                            </button>
                        </Link>
                    </>
                ) : (
                    <p className="text-red-500">Access denied.</p>
                )}
            </div>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
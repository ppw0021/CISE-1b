"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SearchPage() {
    const [allowedAccess, setAccess] = useState<boolean>(false);
    const [fromYear, setFromYear] = useState<string>("0");
    const [toYear, setToYear] = useState<string>("2024");

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token == null || token === "") {
            setAccess(false);
        } else {
            setAccess(true);
        }
    }, []);

    const handleToYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d{0,4}$/.test(e.target.value)) {
            setToYear(e.target.value);
        }
    }

    const handleFromYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d{0,4}$/.test(e.target.value)) {
            setFromYear(e.target.value);
        }
    }
    
    const methods: string[] = ['TDD', 'BDD', 'Code Review', 'Pair Programming', 'Refactoring', 'Agile'];
    const [selectedMethod, setSelectedMethod] = useState<string>('');

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Search SE Method</h2>
                {allowedAccess ? (
                    <>
                        <div className="">
                            <h3 className="font-semibold mb-2">Select SE Method:</h3>
                            {methods.map((method) => (
                                <div key={method} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id={method}
                                        name="seMethod"
                                        value={method}
                                        checked={selectedMethod === method}
                                        onChange={() => setSelectedMethod(method)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={method} className="text-gray-700">
                                        {method}
                                    </label>
                                </div>
                            ))}
                        </div>
                        From (year):
                        <input
                            type="number"
                            value={fromYear}
                            onChange={handleFromYearChange}
                            className='border p-2 rounded m-1 w-20'
                        />
                        To (year): 
                        <input
                            type="number"
                            value={toYear}
                            onChange={handleToYearChange}
                            className='border p-2 rounded m-1 mb-4 w-20'
                        />
                        <br></br>
                            <Link href={`/search/results?method=${selectedMethod}&fromYear=${fromYear}&toYear=${toYear}`}>
                                <button
                                    disabled={!selectedMethod} // Disable if no method is selected
                                    className={`px-4 py-2 ${!selectedMethod ? 'bg-gray-400' : 'bg-blue'} text-white rounded hover:${!selectedMethod ? 'bg-gray-400' : 'bg-blue'}`}
                                >
                                    Search
                                </button>
                        </Link>
                        <Link href={"/"}>
                            <button
                                className={"ml-1"}
                            >
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

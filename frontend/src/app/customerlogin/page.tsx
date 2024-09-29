"use client";  // Add this line to ensure it's treated as a Client Component
import Link from 'next/link';
import { useState } from 'react';
import crypto from 'crypto';

export default function CustomerPage() {

    const [emailEntry, setEmailEntry] = useState<string>("");
    const [passwordEntry, setPasswordEntry] = useState<string>("");
    const [userExists, setUserExists] = useState<boolean | null>(null);
    const [error, setError] = useState<string>("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailEntry(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordEntry(e.target.value);
    }

    const hashMD5 = (password: string) => {
        return crypto.createHash('md5').update(password).digest('hex');
    };

    const handleInput = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await fetch(apiUrl + `/user/exists?email=${emailEntry}`);
            if (!response.ok) {
                throw new Error("Failed to fetch user existence");
            }

            const data = await response.json();

            if (data.exists) {
                setUserExists(true);
                console.log("User exists!");
            } else {
                setUserExists(false);
                console.log("User does not exist.");
            }
        } catch (err) {
            setError("An error occured when checking the email.");
            console.error(err);
        }
        const hashedPassword = hashMD5(passwordEntry);
        console.log("Hashed Password:", hashedPassword);
        console.log("Username:", emailEntry);
        //Logic goes here like calling an API
    }
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
                <h1 className="text-lg font-bold">Log in Here</h1>
                <Link href="/main">
                </Link>
                <input
                    type="text"
                    value={emailEntry}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    className="border p-2 rounded mb-2 w-64"
                />
                <input
                    type="password"
                    value={passwordEntry}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="border p-2 rounded mb-2 w-64"
                />
                <button
                    onClick={handleInput}
                >
                    Log in
                </button>
            </div>
        </div>
    );
}

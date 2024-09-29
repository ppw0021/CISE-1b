"use client";  // Add this line to ensure it's treated as a Client Component
import Link from 'next/link';
import { useState } from 'react';

export default function CustomerPage() {

    const [emailEntry, setEmailEntry] = useState<string>("");
    const [passwordEntry, setPasswordEntry] = useState<string>("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailEntry(e.target.value);
    }

    const handleEmailInput = () => {
        console.log("Username:", emailEntry);
        //Logic goes here like calling an API
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordEntry(e.target.value);
    }

    const handlePasswordInput = () => {
        console.log("Password:", passwordEntry);
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
                    onClick={handleEmailInput}
                >
                    Log in
                </button>
            </div>
        </div>
    );
}

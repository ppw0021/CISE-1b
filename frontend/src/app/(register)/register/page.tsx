"use client";
import Link from 'next/link';
import { useState } from 'react';
import crypto from 'crypto';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {

    const [emailEntry, setEmailEntry] = useState<string>("");
    const [passwordEntry, setPasswordEntry] = useState<string>("");
    const [verifyPasswordEntry, setVerifyPasswordEntry] = useState<string>("");
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>("Password incorrect");
    const router = useRouter();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailEntry(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordEntry(e.target.value);
    }

    const handleVerifyPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerifyPasswordEntry(e.target.value);
    }

    const hashMD5 = (password: string) => {
        return crypto.createHash('md5').update(password).digest('hex');
    };

    const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            registerButtonPressed();
        }
    }

    const registerButtonPressed = async () => {
        if (emailEntry == "") {
            setPopupVisible(true);
            setPopupMessage("Please enter an email");
            return;
        }
        else if (passwordEntry == "") {
            setPopupVisible(true);
            setPopupMessage("Please enter a password");
            return;
        }
        else if (passwordEntry != verifyPasswordEntry) {
            setPopupVisible(true);
            setPopupMessage("Passwords do not match");
            return;
        }

        const hashedPassword = hashMD5(passwordEntry);
        console.log("Hashed Password: " + hashedPassword);
        console.log("Email: " + emailEntry);
    }

    const backToLoginButtonPressed = async () => {
        router.push('/login');
    }

    const closePopup = () => {
        setPopupVisible(false); // Method to hide the popup
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
                <h1 className="text-lg font-bold mb-1">Register Here</h1>
                <Link href="/main">
                </Link>
                <input
                    type="text"
                    value={emailEntry}
                    onChange={handleEmailChange}
                    onKeyDown={handleEnterKeyDown}
                    placeholder="Email"
                    className="border p-2 rounded mb-2 w-64"
                />
                <input
                    type="password"
                    value={passwordEntry}
                    onChange={handlePasswordChange}
                    onKeyDown={handleEnterKeyDown}
                    placeholder="Password"
                    className="border p-2 rounded mb-2 w-64"
                />
                <input
                    type="password"
                    value={verifyPasswordEntry}
                    onChange={handleVerifyPasswordChange}
                    onKeyDown={handleEnterKeyDown}
                    placeholder="Verify password"
                    className="border p-2 rounded mb-1 w-64"
                />
                {isPopupVisible && (
                    <div className="">
                        <p
                            className="text-sm text-red-500"
                        >
                            {popupMessage}
                        </p>
                    </div>
                )}
                <button
                    onClick={registerButtonPressed}
                    className="w-64 mt-1"
                >
                    Register
                </button>
                <button
                    onClick={backToLoginButtonPressed}
                    className="w-64 mt-1"
                >
                    Back to Login
                </button>
            </div>

        </div>
    );
}

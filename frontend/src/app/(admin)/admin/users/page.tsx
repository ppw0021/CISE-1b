"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface User {
    email: string;
    passwordHash: string; // Sensitive info, not displayed in the UI
    isAdmin: boolean;
    authToken: string; // Use authToken for backend operations if needed
}

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [allowedAccess, setAccess] = useState<boolean>(false); // Default to false
    const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const isAdmin = localStorage.getItem("is_admin"); // Check admin status
        setAccess(isAdmin === "true"); // Set access based on local storage

        const fetchUsers = async () => {
            if (isAdmin === "true") { // Fetch users only if admin
                try {
                    const response = await fetch('http://localhost:8082/user/all'); // Use full URL
                    if (!response.ok) {
                        throw new Error('Failed to fetch users');
                    }
                    const data = await response.json();
                    setUsers(data);
                } catch (error) {
                    if (error instanceof Error) {
                        setError(error.message); // Set error message if fetch fails
                    } else {
                        setError('An unknown error occurred');
                    }
                }
            setLoading(false); // Set loading to false once done
        }
    };

        fetchUsers(); // Call fetch function
    }, []);

    const handleDelete = async (authToken: string) => {
        try {
            const response = await fetch(`http://localhost:8082/user/${authToken}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setUsers(users.filter(user => user.authToken !== authToken));
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message); // Set error message if fetch fails
            } else {
                setError('An unknown error occurred');
            }
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-4xl text-center">
                {allowedAccess ? (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Welcome to the users page, Admin.</h1>
                        {loading ? (
                            <p>Loading users...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p> // Display error message
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">Email</th>
                                            <th className="py-2 px-4 border-b">Admin</th>
                                            <th className="py-2 px-4 border-b">Auth Token</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.authToken} className="bg-gray-50">
                                                <td className="py-2 px-4 border-b">{user.email}</td>
                                                <td className="py-2 px-4 border-b">{user.isAdmin ? 'Yes' : 'No'}</td>
                                                <td className="py-2 px-4 border-b">{user.authToken}</td>
                                                <button
                                                        onClick={() => handleDelete(user.authToken)}
                                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <Link href="/admin/">
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
};
export default AdminPage;

"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface User {
    email: string;
    passwordHash: string; // Sensitive info, not displayed in the UI
    isAdmin: boolean;
    authToken: string; // Use authToken for backend operations if needed
    isMod: boolean;
    isAnalyst: boolean;
}

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [allowedAccess, setAccess] = useState<boolean>(false); // Default to false
    const [error, setError] = useState<string | null>(null); // Error state

   

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await fetch(apiUrl + '/user/all'); // Use full URL
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const isAdmin = localStorage.getItem("is_admin"); // Check admin status
        setAccess(isAdmin === "true"); // Set access based on local storage

        fetchUsers(); // Call fetch function
    }, []);

    const handleDelete = async (authToken: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await fetch(apiUrl + `/user/${authToken}`, {
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


    const toggleRole = async (authToken: string, role: string, currentStatus: boolean) => {
    try {
        console.log(`Toggling ${role} role for user with authToken ${authToken}`);
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(apiUrl + `/user/toggleRole`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken, role, status: !currentStatus }),
        });

        if (!response.ok) {
            throw new Error('Failed to update role');
        }

        const updatedUser = await response.json();
        setUsers(users.map(user => user.authToken === authToken ? updatedUser : user));
        fetchUsers();
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError('An unknown error occurred');
        }
    }
};

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
                                            <th className="py-2 px-4 border-b">Mod</th>
                                            <th className="py-2 px-4 border-b">Analyst</th>
                                            <th className="py-2 px-4 border-b">Auth Token</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.authToken} className="bg-gray-50">
                                                <td className="py-2 px-4 border-b">{user.email}</td>
                                                <td className="py-2 px-4 border-b">
                                                    <button onClick={() => toggleRole(user.authToken, 'admin', user.isAdmin)}>
                                                        {user.isAdmin ? 'Yes' : 'No'}
                                                    </button>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <button onClick={() => toggleRole(user.authToken, 'mod', user.isMod)}>
                                                        {user.isMod ? 'Yes' : 'No'}
                                                    </button>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <button onClick={() => toggleRole(user.authToken, 'analyst', user.isAnalyst)}>
                                                        {user.isAnalyst ? 'Yes' : 'No'}
                                                    </button>
                                                </td>
                                                <td className="py-2 px-4 border-b">{user.authToken}
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this user?')) {
                                                            handleDelete(user.authToken);
                                                        }
                                                    }}
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

"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [allowedAccess, setAccess] = useState<boolean>(true);
  useEffect(() => {
    const isAdmin = localStorage.getItem("is_admin");
    if (isAdmin == "true") {
      setAccess(true);
    } else {
      setAccess(false);
    }
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
        {allowedAccess ? (
          <>
            <h1 className="text-lg font-bold">Welcome to the admin page.</h1>
            <Link href="/admin/users">
              <button className="w-48 mb-1">
                Manage Users
              </button>
            </Link>
            <Link href="/admin/articles">
              <button className="w-48 mb-1">
                Reviewed Articles
              </button>
            </Link>
            <Link href="/">
              <button className="w-48">
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
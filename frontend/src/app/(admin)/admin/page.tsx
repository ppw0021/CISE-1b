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
            <div className="flex flex-row justify-between items-center">
            <Link href="/admin/users">
              <button>
                Users
              </button>
            </Link>
            <Link href="/admin/articles">
              <button>
                Articles
              </button>
            </Link>
            </div>
          </>
        ) : (
          <h1 className="text-lg font-bold">Please login.</h1>
        )}
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from 'react';
import "../globals.css";
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setLoggedInStatus] = useState<boolean | null>(false);
  const [isUserAdmin, setAdminStatus] = useState<boolean | null>(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const isAdmin = localStorage.getItem("is_admin");
    if (token === null) {
      setLoggedInStatus(false);
      setAdminStatus(false);
    }
    else {
      setLoggedInStatus(true);
      if (isAdmin == "true") {
        setAdminStatus(true);
      } else {
        setAdminStatus(false)
      }
      console.log(isLoggedIn);
      console.log(isUserAdmin);
    }

  }, [isLoggedIn, isUserAdmin, setAdminStatus, setLoggedInStatus]);

  return (
    <html lang="en">
      <title>Group 7</title>
      <body className="flex flex-col min-h-screen">
        <header className="shadow-lg">
          <h1 className="mb-2">SPEED Application</h1>
          <nav>
            <Link href="/">
              <button aria-label="Home" className="mr-2">
                Home
              </button>
            </Link>
            <>
            </>
          </nav>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="shadow-lg">
          <p>Group Number 7: Adam, Declan, and Joel.</p>
        </footer>
      </body>
    </html >
  );
}

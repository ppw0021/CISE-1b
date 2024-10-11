"use client";
import { useState, useEffect } from 'react';
import "../globals.css"; // Ensure this path is correct for your project
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ModeratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setLoggedInStatus] = useState<boolean | null>(true);
  const [isUserAdmin, setAdminStatus] = useState<boolean | null>(false);
  const router = useRouter();

  const logOutClicked = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("is_admin");
    setLoggedInStatus(false);
    setAdminStatus(false);
    router.push("/");
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const isAdmin = localStorage.getItem("is_admin");
    if (token === null) {
      setLoggedInStatus(false);
      setAdminStatus(false);
    } else {
      setLoggedInStatus(true);
      setAdminStatus(isAdmin === "true");
    }
  }, []);

  return (
    <html lang="en">
      <title>Moderator Page</title>
      <body className="flex flex-col min-h-screen">
        <header className="shadow-lg">
          <h1 className="mb-2">Moderator Portal</h1>
          <nav>
            <Link href="/">
              <button aria-label="Home" className="mr-2">
                Home
              </button>
            </Link>
            {!isLoggedIn && (
              <Link href="/login">
                <button aria-label="Login" className="mr-2">
                  Login
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <>
                <button aria-label="Logout" className="mr-2" onClick={logOutClicked}>
                  Logout
                </button>
                <Link href="/search">
                  <button aria-label="Search" className="mr-2">
                    Search
                  </button>
                </Link>
                <Link href="/moderator">
                  <button aria-label="Moderator" className="mr-2">
                    Moderate Article
                  </button>
                </Link>
                <Link href="/browse">
                  <button aria-label="Browse" className="mr-2">
                    Browse
                  </button>
                </Link>
                {/* Link to Create Article */}
                <Link href="/create-article">
                  <button aria-label="Create Article" className="mr-2">
                    Create Article
                  </button>
                </Link>
                {isUserAdmin && (
                  <Link href="/admin">
                    <button aria-label="Admin Panel" className="mr-2">
                      Admin Panel
                    </button>
                  </Link>
                )}
              </>
            )}
          </nav>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="shadow-lg">
          <p>Group Number 7: Adam, Declan, and Joel.</p>
        </footer>
      </body>
    </html>
  );
}

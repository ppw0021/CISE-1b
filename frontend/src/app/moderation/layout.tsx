"use client"; // Ensures this component runs on the client side

import { useState, useEffect } from "react";
import "../globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State variables for authentication and admin status
  const [isLoggedIn, setLoggedInStatus] = useState<boolean | null>(null);
  const [isUserAdmin, setAdminStatus] = useState<boolean | null>(null);
  const router = useRouter();

  // Log out function to clear local storage and update state
  const logOutClicked = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("is_admin");
    setLoggedInStatus(false);
    setAdminStatus(false);
    router.push("/");
  };

  // Effect to check the login status and admin status on component mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const isAdmin = localStorage.getItem("is_admin");

    if (token) {
      setLoggedInStatus(true);
      setAdminStatus(isAdmin === "true");
    } else {
      setLoggedInStatus(false);
      setAdminStatus(false);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Group 7</title>
      </head>
      <body className="flex flex-col min-h-screen">
        <header className="shadow-lg">
          <h1 className="mb-2">SPEED Application</h1>
          <nav>
            <Link href="/">
              <button aria-label="Home" className="mr-2">
                Home
              </button>
            </Link>
            <Link href="/moderation">
              <button aria-label="Moderation" className="mr-2">
                Moderation
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
                <Link href="/createArticle">
                  <button aria-label="Submit Article" className="mr-2">
                    Submit Article
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

"use client";
import { useState, useEffect } from 'react';
import "../globals.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setLoggedInStatus] = useState<boolean | null>(true);
  const [isUserAdmin, setAdminStatus] = useState<boolean | null>(false);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [loadedStorage, setLoadedStorage] = useState<boolean | null>(false);
  const [showButtons, setShowButtons] = useState<boolean>(false);
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
      setLoadedStorage(true);
    } else {
      setLoggedInStatus(true);
      setAdminStatus(isAdmin === "true");
      setLoadedStorage(true);
    }
    getNotifications();
  }, []);

  const getNotifications = async () => {
    if (!isLoggedIn) {
      return 0;
    }
    try {
      const emailToSend = localStorage.getItem('email');
      const payload = {
        email: emailToSend,
      };
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(apiUrl + `/notification/filterbyemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user existence");
      }

      const data = await response.json();
      setNotificationCount(data.length);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <html lang="en">
      <title>Group 7</title>
      <body className="flex flex-col min-h-screen">
        <header className="shadow-lg">
          <nav className="flex items-center justify-between">
            {/* SPEED Application title positioned on the left */}
            <h1 className="text-xl">SPEED Application</h1>
            {/* Toggle button placed to the right of the title */}
            <div>
              {(isLoggedIn && loadedStorage) && (
                <>
                <Link href="/notifications">
                  <button type="button" className="mr-2 relative">
                    Inbox
                    <span className="sr-only">Notifications</span>
                    {(notificationCount > 0) && (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-s font-bold bg-red-500 rounded-full -top-2 -end-2">
                        {notificationCount}
                      </div>
                    )}
                  </button>
                </Link>
                <button aria-label="Logout" className="mr-2" onClick={logOutClicked}>
                  Logout
                </button>
                </>
              )}
              {(!isLoggedIn && loadedStorage) && (
                <Link href="/login">
                  <button aria-label="Login" className="mr-2">Login</button>
                </Link>
              )}
              <button
                onClick={toggleButtons}
                className={`transition-transform duration-100 ${showButtons ? 'rotate-360' : ''} mb-2`}
                aria-label="Toggle Menu"
              >
                {showButtons ? '▲' : '▼'} {/* Use arrow indicators for toggle */}
              </button>
            </div>
          </nav>
          {/* Buttons container with sliding effect */}
          <div
            className={`overflow-hidden transition-all duration-250 ease-in-out ${showButtons ? 'max-h-20' : 'max-h-0'}`} // Adjust max height as needed
          >
            <div className={`flex items-center ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
              {(isLoggedIn && loadedStorage) && (
                <>
                  <Link href="/">
                    <button aria-label="Home" className="mr-2">Home</button>
                  </Link>
                  <Link href="/search">
                    <button aria-label="Search" className="mr-2">Search</button>
                  </Link>
                  <Link href="/moderator">
                    <button aria-label="Moderator" className="mr-2">Moderate Article</button>
                  </Link>
                  <Link href="/analysis">
                    <button aria-label="Analysis" className="mr-2">Analysis</button>
                  </Link>
                  <Link href="/browse">
                    <button aria-label="Browse" className="mr-2">Browse</button>
                  </Link>
                  <Link href="/create-article">
                    <button aria-label="Create Article" className="mr-2">Create Article</button>
                  </Link>
                  {isUserAdmin && (
                    <Link href="/admin">
                      <button aria-label="Admin Panel" className="mr-2">Admin Panel</button>
                    </Link>
                  )}
                  <Link href="/request">
                    <button aria-label="Request Roles" className="mr-2">Request Roles</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="shadow-lg">
          <p>Group Number 7: Adam, Declan, and Joel.</p>
        </footer>
      </body>
    </html>
  );
}

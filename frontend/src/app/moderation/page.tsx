'use client';
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import '../globals.css';
import { useRouter } from "next/navigation";


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

const Moderation = () => {
    return (
        <div>
                    <nav>
            <Link href="/">
              <button aria-label="Home" className="mr-2">
                Home
              </button>
            </Link>
            {/* Add Moderation link here */}
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
            <h1>Moderation</h1>
        </div>
    );
};

export default Moderation;

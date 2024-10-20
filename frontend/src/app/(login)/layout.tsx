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

  const goHome = () =>{
    window.location.href = '/';
  } 

  return (
    <html lang="en">
      <title>Group 7</title>
      <body className="flex flex-col min-h-screen">
        <header className="shadow-lg">
          <nav className="flex items-center justify-between">
              <button className="border-none outline-none bg-transparent p-0 m-0 text-2xl shadow-none hover:shadow-none hover:bg-transparent" onClick={goHome}>
                SPEED Application
              </button>

            <div>
              <button
                aria-label="Toggle Menu"
              >
                ▼
              </button>
            </div>
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

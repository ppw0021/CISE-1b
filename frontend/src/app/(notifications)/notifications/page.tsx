"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [storedAuthToken, setStoredAuthToken] = useState<string | null>(null);
  const [isUserAdmin, setAdminStatus] = useState<string | null>(null);
  const [isUserMod, setModStatus] = useState<string | null>(null);
  const [isUserAnalyst, setAnalystStatus] = useState<string | null>(null);
  useEffect(() => {
    //Retrieve auth token from localStorage when the component mounts
    const token = localStorage.getItem('auth_token');
    const isAdmin = localStorage.getItem('is_admin');
    const isMod = localStorage.getItem('is_mod');
    const isAnalyst = localStorage.getItem('is_analyst');
    setAdminStatus(isAdmin);
    setModStatus(isMod);
    setAnalystStatus(isAnalyst);
    setStoredAuthToken(token);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
        <h1 className="text-lg font-bold">Notification Page</h1>
        {storedAuthToken ? (
          <p>
          Authenticated with token: {storedAuthToken}<br />
          Admin: {isUserAdmin}<br />
          Mod: {isUserMod}<br />
          Analyst: {isUserAnalyst}
        </p>
        ) : (
          <p>No auth token found</p>
        )}
        
      </div>
    </div>
  );
}

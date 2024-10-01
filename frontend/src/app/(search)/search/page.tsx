"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [allowedAccess, setAccess] = useState<boolean>(true);
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token == null || token == "") {
      setAccess(false);
    } else {
      setAccess(true);
    }
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className=" w-max text-center">
        {allowedAccess && (
          <h1 className="text-lg font-bold">Welcome to the search page.</h1>
        )}
        {!allowedAccess && (
          <h1 className="text-lg font-bold">Please login.</h1>
        )}
     

      </div>
    </div>
  );
}

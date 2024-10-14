"use client"
import { useEffect, useState } from 'react';

export default function MessageSubmissionPage() {
  const [message, setMessage] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [storedAuthToken, setStoredAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve auth token from localStorage when the component mounts
    const token = localStorage.getItem('auth_token');
    setStoredAuthToken(token);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!storedAuthToken) {
      setResponseMessage('No auth token found');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${apiUrl}/messages/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedAuthToken}`,
        },
        body: JSON.stringify({storedAuthToken,message }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      const data = await response.json();
      setResponseMessage(`Message submitted successfully: ${data.message}`);
    } catch (error) {
      if (error instanceof Error) {
        setResponseMessage(`Error: ${error.message}`);
      } else {
        setResponseMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
        <h1 className="text-lg font-bold">Submit a Message</h1>
        {storedAuthToken ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Please write what roles you would like and why!
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>No auth token found</p>
        )}
        {responseMessage && <p className="mt-4">{responseMessage}</p>}
      </div>
    </div>
  );
}
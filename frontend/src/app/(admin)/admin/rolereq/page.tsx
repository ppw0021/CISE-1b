"use client"
import { useState, useEffect } from 'react';

interface Message {
    _id: string;
    sender: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
                const response = await fetch(apiUrl + '/messages');
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const data: Message[] = await response.json();
                setMessages(data);
                console.log(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
      <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          <ul className="space-y-4">
              {messages.map(message => (
                  <li key={message._id} className="border p-4 rounded-lg shadow-md bg-white">
                      <p className="font-bold">Sender: {message.sender}</p>
                      <p className="text-lg">{message.message}</p>
                      <p className={`font-semibold ${message.isRead ? 'text-green-500' : 'text-red-500'}`}>
                          {message.isRead ? 'Read' : 'Unread'}
                      </p>
                      <p className="text-sm text-gray-500">Created at: {new Date(message.createdAt).toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Updated at: {new Date(message.updatedAt).toLocaleString()}</p>
                      <div className="mt-4 flex space-x-2">
                          <button
                              className="bg-green-500 text-white px-4 py-2 rounded-lg"
                          >
                              Approve
                          </button>
                          <button
                              className="bg-red-500 text-white px-4 py-2 rounded-lg"
                          >
                              Deny
                          </button>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
  );
}
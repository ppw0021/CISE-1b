"use client"
import { useState, useEffect } from 'react';

interface Notification {
  _id: string;
  email: string;
  note: string;
}

export default function Home() {
  const [storedAuthToken, setStoredAuthToken] = useState<string | null>(null);
  const [isUserAdmin, setAdminStatus] = useState<string | null>(null);
  const [isUserMod, setModStatus] = useState<string | null>(null);
  const [isUserAnalyst, setAnalystStatus] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const emailToSend = localStorage.getItem('email');
      //console.log(emailToSend);
      const payload = {
        email: emailToSend,
      }
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(apiUrl + `/notification/filterbyemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error("Failed to fetch user existence");
      }

      const data = await response.json();
      console.log(data);
      setNotifications(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
        <h1 className="text-lg font-bold">Notification Page</h1>
        <table className="w-full">
          <tbody>
            {notifications.map(notif => (
              <tr key={notif.email} className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-4">{notif.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}

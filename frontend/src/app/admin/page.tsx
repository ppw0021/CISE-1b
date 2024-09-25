import Link from 'next/link';
export default function AdminPage() {
    return (
      <div className="flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
        <h1 className="text-lg font-bold">Logged in, welcome to the admin page.</h1>
        <Link href="/main">
        </Link>
        <Link href="/">
        <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 dark:bg-green-700">
        Return
          </button>
        </Link>
      </div>
    </div>
    );
  }
  
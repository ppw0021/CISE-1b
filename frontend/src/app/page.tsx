import Link from 'next/link';
export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
        <h1 className="text-lg font-bold">Login Here</h1>
        <Link href="/customer">
        <button className="mb-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 dark:bg-blue-700">
        Login as Customer
          </button>
        </Link>
        <Link href="/admin">
        <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 dark:bg-green-700">
        Login as Administrator
          </button>
        </Link>
      </div>
    </div>
  );
}

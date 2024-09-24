import Link from 'next/link';
export default function AdminPage() {
    return (
      <div className="flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
        <h1 className="text-lg font-bold">Logged in, welcome to the admin page.</h1>
        <Link href="/main">
        </Link>
        <Link href="/">
          <button>
            Return
          </button>
        </Link>
      </div>
    </div>
    );
  }
  
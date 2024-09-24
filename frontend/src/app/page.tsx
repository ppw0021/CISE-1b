import Link from 'next/link';
export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center">
        <h1 className="text-lg font-bold">Login Here</h1>
        <Link href="/customer">
          <button className="mb-2">
            Login as Customer
          </button>
        </Link>
        <Link href="/admin">
          <button>
            Login as Administrator
          </button>
        </Link>
      </div>
    </div>
  );
}

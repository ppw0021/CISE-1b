import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <div>
        <p></p>
      </div>
      <h1>Login Here</h1>
      <Link href="/main">
        <button>LOGIN</button>
      </Link>
    </div>
  );
}

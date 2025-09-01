import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary-dark text-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Blood Bank
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/requests/new" className="hover:underline">Request Blood</Link>
          <Link href="/admin" className="hover:underline">Admin</Link>
        </div>
      </nav>
    </header>
  );
}

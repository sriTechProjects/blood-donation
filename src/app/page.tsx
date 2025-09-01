import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto text-center p-10">
      <h1 className="text-4xl font-bold my-4">Welcome to the Blood Bank</h1>
      <p className="text-lg text-gray-700 mb-8">Your contribution can save a life. Request blood when you need it.</p>

      <div className="space-x-4">
        <Link href="/requests/new" className="btn-primary text-lg px-6 py-3">
          Request Blood
        </Link>
      </div>

      <div className="mt-16 p-6 border-t border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">About Our System</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          This system provides real-time management of blood stock, requests, and donations.
          Administrators can efficiently oversee inventory and respond to urgent needs, while users can easily submit requests for blood.
        </p>
      </div>
    </div>
  );
}

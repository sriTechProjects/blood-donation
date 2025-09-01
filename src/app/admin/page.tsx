import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/blood-stock" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Manage Blood Stock</h5>
            <p className="font-normal text-gray-700">View and update current inventory.</p>
        </Link>
        <Link href="/admin/requests" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Manage Requests</h5>
            <p className="font-normal text-gray-700">Approve or reject incoming blood requests.</p>
        </Link>
         <Link href="/admin/donors" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Manage Donors</h5>
            <p className="font-normal text-gray-700">View and manage donor information.</p>
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface Recipient {
  id: number;
  name: string;
  email: string;
  contact: string;
}

interface Request {
  id: number;
  recipientId: number;
  recipient: Recipient;
  date: string;
  bloodType: string;
  volume: number;
  status: string;
}

export default function RequestManagementPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    setLoading(true);
    try {
      const res = await fetch('/api/requests');
      if (!res.ok) {
        throw new Error('Failed to fetch requests');
      }
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  async function handleUpdateStatus(id: number, status: 'fulfilled' | 'rejected') {
    setError(null);
    try {
      const res = await fetch(`/api/requests/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      await fetchRequests(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }

  if (loading) {
    return <p className="text-center p-4">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Request Management</h1>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}

      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Recipient</th>
              <th className="py-3 px-6 text-left">Contact</th>
              <th className="py-3 px-6 text-center">Blood Type</th>
              <th className="py-3 px-6 text-center">Volume</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{request.recipient.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>{request.recipient.email}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="bg-primary-light text-primary-dark py-1 px-3 rounded-full text-xs">
                    {request.bloodType}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span>{request.volume}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className={`py-1 px-3 rounded-full text-xs ${
                    request.status === 'fulfilled' ? 'bg-green-200 text-green-700' :
                    request.status === 'rejected' ? 'bg-red-200 text-red-700' :
                    'bg-yellow-200 text-yellow-700'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  {request.status === 'pending' && (
                    <div className="flex item-center justify-center">
                      <button
                        onClick={() => handleUpdateStatus(request.id, 'fulfilled')}
                        className="w-4 mr-2 transform hover:text-green-500 hover:scale-110">
                        ✅
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(request.id, 'rejected')}
                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                        ❌
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, FormEvent } from 'react';

interface BloodStock {
  id: number;
  bloodType: string;
  volume: number;
}

export default function BloodStockPage() {
  const [stock, setStock] = useState<BloodStock[]>([]);
  const [bloodType, setBloodType] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchStock() {
    try {
      const res = await fetch('/api/blood-stock');
      if (!res.ok) {
        throw new Error('Failed to fetch stock');
      }
      const data = await res.json();
      setStock(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStock();
  }, []);

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/blood-stock', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bloodType, volume: parseInt(volume, 10) }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update stock');
      }

      // Refresh stock list
      await fetchStock();
      setBloodType('');
      setVolume('');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }

  if (loading) {
    return <p className="text-center p-4">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blood Stock Management</h1>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Current Stock</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Blood Type</th>
                <th className="border border-gray-300 p-2 text-left">Volume (units)</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2">{item.bloodType}</td>
                  <td className="border border-gray-300 p-2">{item.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Update Stock</h2>
          <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodType">
                Blood Type
              </label>
              <input
                id="bloodType"
                type="text"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value.toUpperCase())}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., A+"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="volume">
                Volume (units)
              </label>
              <input
                id="volume"
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., 100"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="btn-primary" type="submit">
                Update Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function NewRequestPage() {
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [volume, setVolume] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const payload = {
      recipientData: {
        name: recipientName,
        email: recipientEmail,
        contact: recipientContact,
        // The backend schema requires a bloodType for the recipient,
        // we'll use the one from the request.
        bloodType: bloodType,
      },
      requestData: {
        bloodType: bloodType,
        volume: parseInt(volume, 10),
      }
    };

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to submit request');
      }

      setSuccess(true);
      // Clear form
      setRecipientName('');
      setRecipientEmail('');
      setRecipientContact('');
      setBloodType('');
      setVolume('');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Request Blood</h1>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}

      {success && (
        <div className="text-green-700 bg-green-100 p-3 rounded mb-4">
          <p>Your request has been submitted successfully!</p>
          <Link href="/" className="underline">Return to Home</Link>
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl text-gray-800 font-semibold mb-3">Recipient Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientName">
              Full Name
            </label>
            <input
              id="recipientName"
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientEmail">
              Email
            </label>
            <input
              id="recipientEmail"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
           <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientContact">
              Contact Number
            </label>
            <input
              id="recipientContact"
              type="text"
              value={recipientContact}
              onChange={(e) => setRecipientContact(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <hr className="my-6" />

          <h2 className="text-xl text-gray-800 font-semibold mb-3">Request Details</h2>
           <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodType">
              Blood Type
            </label>
            <input
              id="bloodType"
              type="text"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value.toUpperCase())}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="e.g., O-"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="e.g., 2"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button className="btn-primary w-full" type="submit">
              Submit Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// app/admin/donors/page.tsx
"use client";

import React, { useState, useEffect, FormEvent } from "react";

type Donor = {
  id: number;
  name: string;
  email: string;
  bloodType: string;
  contact: string;
};

type DonorFormData = Omit<Donor, "id">;

export default function DonorManagementPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [formData, setFormData] = useState<DonorFormData>({
    name: "",
    email: "",
    bloodType: "",
    contact: "",
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/donors");
      if (!response.ok) throw new Error("Failed to fetch donors");
      const data: Donor[] = await response.json();
      setDonors(data);
    } catch (error) {
      console.error(error);
      alert("Could not fetch donor data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, formType: "add" | "edit") => {
    const { name, value } = e.target;
    if (formType === "add") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (editingDonor) {
      setEditingDonor({ ...editingDonor, [name]: value });
    }
  };

  const handleAddDonor = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add donor");
      }
      setFormData({ name: "", email: "", bloodType: "", contact: "" });
      fetchDonors();
      alert("Donor added successfully ✅");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleDeleteDonor = async (id: number) => {
    if (!confirm("Are you sure you want to delete this donor?")) return;
    try {
      const response = await fetch(`/api/donors/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete donor");
      fetchDonors();
      alert("Donor deleted successfully 🗑️");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleUpdateDonor = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingDonor) return;
    try {
      const response = await fetch(`/api/donors/${editingDonor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDonor),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update donor");
      }
      setEditingDonor(null);
      fetchDonors();
      alert("Donor updated successfully ✏️");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold tracking-tight">Donor Management</h1>

      {/* Add Donor Form */}
      <div className="rounded-xl shadow-lg bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Add New Donor</h2>
        <form onSubmit={handleAddDonor} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "add")}
              required
              className="mt-1 w-full rounded-lg border-gray-800 focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, "add")}
              required
              className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Blood Type</label>
            <input
              type="text"
              name="bloodType"
              placeholder="A+"
              value={formData.bloodType}
              onChange={(e) => handleInputChange(e, "add")}
              required
              className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={(e) => handleInputChange(e, "add")}
              required
              className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Add Donor
            </button>
          </div>
        </form>
      </div>

      {/* Donors Table */}
      <div className="rounded-xl shadow-lg bg-white">
        <h2 className="text-lg font-semibold text-gray-700 border-b p-4">Existing Donors</h2>
        {isLoading ? (
          <p className="p-4">Loading donors...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Blood Type</th>
                  <th className="p-3 text-left">Contact</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, idx) => (
                  <tr key={donor.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3">{donor.name}</td>
                    <td className="p-3">{donor.email}</td>
                    <td className="p-3">{donor.bloodType}</td>
                    <td className="p-3">{donor.contact}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => setEditingDonor(donor)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDonor(donor.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Donor Modal */}
      {editingDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl mb-4">Edit Donor</h2>
            <form onSubmit={handleUpdateDonor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingDonor.name}
                  onChange={(e) => handleInputChange(e, "edit")}
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingDonor.email}
                  onChange={(e) => handleInputChange(e, "edit")}
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Blood Type</label>
                <input
                  type="text"
                  name="bloodType"
                  value={editingDonor.bloodType}
                  onChange={(e) => handleInputChange(e, "edit")}
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={editingDonor.contact}
                  onChange={(e) => handleInputChange(e, "edit")}
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingDonor(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

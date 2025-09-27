import React, { useState } from "react";

export default function PendingSingleUserForm() {
  const [formData, setFormData] = useState({
    id: "1145",
    phone: "+91 9786543210",
    plan: "Monthly",
    total: "₹ 3000",
    paid: "₹ 2000",
    pending: "₹ 1000",
    pause: "22/08/2025",
    rejoin: "N/A",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    console.log("Updated data:", formData);
    alert("User data updated!");
  };

  const handleRemove = () => {
    console.log("Removed user:", formData.id);
    alert("User removed!");
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">User Profile</h2>
        <div className="flex gap-2">
          <button className="border rounded px-4 py-2 text-sm">Download Invoice</button>
          <button className="bg-blue-600 text-white rounded px-4 py-2 text-sm">Add User</button>
        </div>
      </div>

      {/* Profile fields */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-50 px-3 py-2 border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Phone number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-50 px-3 py-2 border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Membership Plan</label>
            <input
              type="text"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-50 px-3 py-2 border border-gray-200"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Total Amount</label>
            <input
              type="text"
              name="total"
              value={formData.total}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-50 px-3 py-2 border border-gray-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Paid</label>
              <input
                type="text"
                name="paid"
                value={formData.paid}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-50 px-3 py-2 border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Pending</label>
              <input
                type="text"
                name="pending"
                value={formData.pending}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-50 px-3 py-2 border border-gray-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Pause</label>
              <input
                type="text"
                name="pause"
                value={formData.pause}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-50 px-3 py-2 border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Rejoin</label>
              <input
                type="text"
                name="rejoin"
                value={formData.rejoin}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-50 px-3 py-2 border border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button onClick={handleRemove} className="bg-gray-200 text-gray-700 rounded px-6 py-2">
          Remove
        </button>
        <button onClick={handleUpdate} className="bg-gray-800 text-white rounded px-6 py-2">
          Update
        </button>
      </div>
    </div>
  );
}

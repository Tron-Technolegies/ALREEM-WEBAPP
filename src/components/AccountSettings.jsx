import React from "react";

export default function AccountSettings() {
  return (
    <div className="bg-white rounded-lg p-6">
      {/* Header */}
      <div className="rounded-lg bg-[#F5F5F5] p-4">
        <p className="text-lg font-semibold">Account Settings</p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <label className="font-medium">Full Name</label>
          <input
            type="text"
            className="bg-[#F3F9F9] rounded-lg p-2 mt-2 w-full"
            placeholder="Please enter your full name"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">E-mail</label>
          <input
            type="email"
            className="bg-[#F3F9F9] rounded-lg p-2 mt-2 w-full"
            placeholder="Please enter your email"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="font-medium">Phone Number</label>
          <input
            type="tel"
            className="bg-[#F3F9F9] rounded-lg p-2 mt-2 w-full"
            placeholder="Please enter your phone number"
          />
        </div>
      </div>

      {/* Button */}
      <div className="mt-6">
        <button className="bg-[#0E45B6] text-white py-2 px-6 rounded-lg">Update</button>
      </div>
    </div>
  );
}

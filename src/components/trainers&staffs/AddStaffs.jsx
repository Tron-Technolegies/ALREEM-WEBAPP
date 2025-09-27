import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

export default function AddStaffs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profile_picture: null,
    name: "",
    phone: "",
    email: "",
    location: "",
    trainer_or_staff: "Trainer",
    age: "",
    weight: "",
    blood_group: "A+",
  });

  const [preview, setPreview] = useState(null); // for image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profile_picture: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    try {
      const res = await API.post("/members/add_trainer_staff", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to add trainer/staff");
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 border border-gray-200">
        {/* Header */}
        <div className="bg-[#F5F5F5] flex justify-between items-center rounded-lg p-4 flex-wrap gap-2">
          <p className="text-lg font-semibold">Add Trainer & Staff</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-[#0088FE] text-white py-2 px-4 rounded"
          >
            Back
          </button>
        </div>

        {/* Form Fields */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Profile Picture */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 flex flex-col items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-32 h-32 object-cover  mb-2" />
                ) : (
                  <svg
                    className="h-12 w-12 text-gray-400 mb-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                <input
                  type="file"
                  className="sr-only"
                  id="profilePic"
                  name="profile_picture"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="profilePic"
                  className="cursor-pointer text-gray-500 py-2 px-4 rounded-lg inline-block hover:bg-gray-100"
                >
                  {preview ? "Change Photo" : "Upload your photo"}
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">User</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-lg bg-[#F0F8FF]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full p-3 border border-gray-300 rounded-lg bg-[#F0F8FF]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg bg-[#F0F8FF]"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Location */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-3 border border-gray-300 rounded-lg bg-[#F0F8FF]"
              />
            </div>

            {/* Trainer/Staff */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Trainer/Staff</label>
              <select
                name="trainer_or_staff"
                value={formData.trainer_or_staff}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-[#F0F8FF]"
              >
                <option>Trainer</option>
                <option>Staff</option>
              </select>
            </div>

            {/* Age, Weight, Blood */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 justify-items-center">
              <div className="w-full sm:w-auto">
                <label className="block mb-2 text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full sm:w-[100px] p-3 border border-gray-300 rounded-lg bg-[#F0F8FF] text-center"
                />
              </div>
              <div className="w-full sm:w-auto">
                <label className="block mb-2 text-sm font-medium text-gray-700">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full sm:w-[100px] p-3 border border-gray-300 rounded-lg bg-[#F0F8FF] text-center"
                />
              </div>
              <div className="w-full sm:w-auto">
                <label className="block mb-2 text-sm font-medium text-gray-700">Blood</label>
                <select
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  className="w-full sm:w-[100px] p-3 border border-gray-300 rounded-lg bg-[#F0F8FF] text-center"
                >
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button type="submit" className="bg-[#0088FE] text-white py-3 px-8 rounded-lg">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

export default function EditPlan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    duration_days: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch plan details
  useEffect(() => {
    API.get(`/members/edit_plan/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.name,
          duration_days: res.data.duration_days,
          price: res.data.price || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.name) newErrors.name = "Plan name is required";
    if (!formData.duration_days) newErrors.duration_days = "Duration is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await API.post(`/members/edit_plan/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Plan updated successfully!");
      navigate("/plans");
    } catch (err) {
      console.error("Error updating plan:", err.response?.data || err.message);
      alert("Failed to update plan!");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-white p-4 rounded-lg">
      <div className="w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Plan</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. Monthly Plan"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (Days) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="duration_days"
              value={formData.duration_days}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.duration_days ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. 30"
            />
            {errors.duration_days && (
              <p className="text-red-500 text-xs mt-1">{errors.duration_days}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (Optional)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="e.g. 500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/plans")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 shadow-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium shadow-md hover:bg-blue-700 active:scale-95 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

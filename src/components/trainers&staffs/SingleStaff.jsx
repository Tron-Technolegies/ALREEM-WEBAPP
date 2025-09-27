import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

export default function SingleStaff() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await API.get(`members/view_single_trainer_staff/${id}`);
        if (res.data.status === "success") {
          setTrainer(res.data.data);
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch trainer data");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainer();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      // 🔹 make sure this matches your Django URL pattern
      await API.delete(`members/delete_trainer_staff/${id}`);
      alert("Deleted successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!trainer) return <p>Trainer not found</p>;

  return (
    <div className="bg-white p-6 rounded-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{trainer.user || trainer.name}</h1>
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <img
          src={trainer.profile_picture || "https://via.placeholder.com/150"}
          alt={trainer.user || trainer.name}
          className="w-32 h-32 object-cover rounded-full border border-gray-300"
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
            {trainer.phone_number || trainer.phone || "N/A"}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            {trainer.email || "N/A"}
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
            {trainer.location || "N/A"}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Trainer/Staff</label>
            {trainer.trainer_or_staff || "Trainer"}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 mx-auto">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Age</label>
              {trainer.age || "-"}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Weight</label>
              {trainer.weight || "-"}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Blood</label>
              {trainer.blood_group || "-"}
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => navigate(`/edit_trainer_staff/${id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

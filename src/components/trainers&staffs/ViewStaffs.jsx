import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../utils/api";

export default function ViewStaffs() {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const res = await API.get("members/view_all_trainers_staff");
        if (res.data.status === "success") {
          setStaffs(res.data.data);
        } else {
          console.error("Failed to fetch members:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  if (loading) return <p>Loading trainers and staffs...</p>;

  return (
    <div className="bg-white rounded-lg p-4 min-h-screen">
      <div className="border border-gray-200 bg-white rounded-lg p-4 min-h-screen">
        <div className="bg-[#F3F9F9] rounded-xl p-4 flex justify-between items-center mb-10">
          <p className="text-lg text-[#455154] font-bold">Trainers & Staffs Lists</p>
          <Link to="/add/staffs">
            <button
              type="button"
              className="bg-[#0E45B7F2] text-white px-4 py-2 text-sm rounded-lg"
            >
              Add Trainer / Staffs
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffs.map((staff) => (
            <div
              key={staff.id}
              className="bg-[#F3F9F9] rounded-lg shadow-md p-10 flex flex-col items-center"
            >
              <img
                src={staff.profile_picture}
                alt={staff.user || staff.name}
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{staff.user || staff.name}</h2>
              <p className="text-gray-680">{staff.trainer_or_staff || "Trainer"}</p>

              <button
                onClick={() => navigate(`/staff/${staff.id}`)}
                className="bg-[#0088FE] text-white px-4 py-2 rounded mt-4"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

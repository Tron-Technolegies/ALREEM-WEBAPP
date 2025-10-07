import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  const fetchBranches = async () => {
    try {
      const res = await API.get("/members/view-branches");
      setBranches(res.data.branches);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBranch = async (id) => {
    try {
      await API.post(`/members/delete-branch/${id}/`);
      fetchBranches();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[#0E45B7] font-semibold text-lg">Branch List</h2>
        <button
          onClick={() => navigate("/add/branch")}
          className="bg-[#0E45B7] text-white px-4 py-2 rounded hover:opacity-90"
        >
          + Add Branch
        </button>
      </div>

      {/* Branch Items */}
      <ul className="mt-4 space-y-3">
        {branches.map((b) => (
          <li key={b.id} className="flex justify-between items-center border p-3 rounded">
            <div>
              <p className="font-medium">{b.name}</p>
              <p className="text-gray-600 text-sm">{b.location}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/edit_branch/${b.id}`)}
                className="text-[#0E45B7] px-3 py-1 border border-[#0E45B7] rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBranch(b.id)}
                className="text-red-600 border border-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchList;

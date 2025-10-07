import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

const EditBranchForm = () => {
  const { id } = useParams(); // get branch id from URL
  const navigate = useNavigate();
  const [bname, setBname] = useState("");
  const [blocation, setBlocation] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch branch details to pre-fill form
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await API.get(`/members/view-branches`);
        const branch = res.data.branches.find((b) => b.id === parseInt(id));
        if (branch) {
          setBname(branch.name);
          setBlocation(branch.location);
        }
      } catch (err) {
        console.error("Error fetching branch:", err);
      }
    };
    fetchBranch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("bname", bname);
      formData.append("blocation", blocation);

      await API.post(`/members/edit-branch/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate(-1); // redirect back after update
    } catch (err) {
      console.error("Error updating branch:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 flex flex-col gap-4 max-w-md mx-auto mt-6"
    >
      <h2 className="text-[#0E45B7] font-semibold text-lg">Edit Branch</h2>
      <input
        type="text"
        value={bname}
        onChange={(e) => setBname(e.target.value)}
        placeholder="Branch Name"
        className="border p-2 rounded"
      />
      <input
        type="text"
        value={blocation}
        onChange={(e) => setBlocation(e.target.value)}
        placeholder="Branch Location"
        className="border p-2 rounded"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0E45B7] text-white px-4 py-2 rounded hover:opacity-90"
        >
          {loading ? "Updating..." : "Update Branch"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/branch_list")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:opacity-90"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBranchForm;

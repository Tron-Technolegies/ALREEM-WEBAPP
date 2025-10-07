import React, { useState } from "react";
import API from "../../utils/api";

const AddBranchForm = ({ onSuccess }) => {
  const [bname, setBname] = useState("");
  const [blocation, setBlocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bname || !blocation) {
      setMessage("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const formData = new FormData();
      formData.append("bname", bname);
      formData.append("blocation", blocation);

      const res = await API.post("/members/add_branch", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === "success" || res.status === 200) {
        setBname("");
        setBlocation("");
        onSuccess(); // refresh branch list or notify parent
        setMessage("Branch added successfully!");
      } else {
        setMessage(res.data.status || "Failed to add branch!");
      }
    } catch (err) {
      console.error("Error adding branch:", err);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 flex flex-col gap-4 max-w-md"
    >
      <h2 className="text-[#0E45B7] font-semibold text-lg">Add Branch</h2>

      {message && (
        <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}

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
      <button
        type="submit"
        disabled={loading}
        className="bg-[#0E45B7] text-white px-4 py-2 rounded hover:opacity-90"
      >
        {loading ? "Adding..." : "Add Branch"}
      </button>
    </form>
  );
};

export default AddBranchForm;

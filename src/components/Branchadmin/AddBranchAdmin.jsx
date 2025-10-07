import React, { useState, useEffect } from "react";
import API from "../../utils/api"; // your axios wrapper

const AddBranchAdmin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch branches from backend for dropdown
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await API.get("/members/view-branches");
        if (response.status === 200) {
          setBranches(response.data.branches);
        }
      } catch (error) {
        console.error("Failed to load branches", error);
      }
    };
    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!username || !email || !password || !branchId) {
      setMessage("Please fill all required fields!");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("branch_id", branchId);

      const response = await API.post("/members/add-branch-admin", formData);

      if (response.status === 200) {
        setMessage("✅ Branch admin created successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
        setPhone("");
        setBranchId("");
      } else {
        setMessage(response.data.status || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create branch admin.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Branch Admin</h2>
      {message && <p className="mb-3 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          className="w-full border p-2 rounded"
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name} ({branch.location})
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Branch Admin"}
        </button>
      </form>
    </div>
  );
};

export default AddBranchAdmin;

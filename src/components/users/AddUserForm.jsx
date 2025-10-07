import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

export default function AddUserForm() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    weight: "",
    blood: "",
    location: "",
    profession: "",
    status: "Active",
    joining_day: "",
    membershipPlan: "",
    feeAmount: "",
    paidAmount: "",
    dueAmount: "",
    leave: "",
    rejoin: "",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await API.get("/members/view_plans");
        if (res.data.plans) setPlans(res.data.plans);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Handle input changes and auto-due calculation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "feeAmount" || name === "paidAmount") {
        const fee = parseFloat(name === "feeAmount" ? value : updated.feeAmount) || 0;
        const paid = parseFloat(name === "paidAmount" ? value : updated.paidAmount) || 0;
        updated.dueAmount = Math.max(fee - paid, 0);
      }

      return updated;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Name and Phone number are required!");
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "blood") payload.append("blood_group", value);
        else if (key === "membershipPlan") payload.append("plan", value);
        else if (key === "feeAmount") payload.append("fee", value);
        else if (key === "paidAmount") payload.append("paid", value);
        else if (key === "dueAmount") payload.append("due", value);
        else payload.append(key, value);
      });
      payload.append("payment_method", "cash");

      const res = await API.post("/members/add_member", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`Member added successfully! Invoice: ${res.data.invoice_number}`);
      navigate(-1);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to add member!");
    }
  };

  return (
    <div className="bg-white min-h-screen p-4 md:p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 flex flex-col space-y-6"
      >
        {/* Header */}
        <div className="bg-[#F3F9F9] rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-2 md:gap-0">
          <p className="text-lg text-[#455154] font-bold">Add User</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-[#0E45B7] text-white px-4 py-2 text-sm rounded-xl hover:bg-blue-800"
          >
            Back
          </button>
        </div>

        {/* Form content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
              <Input
                label="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="flex-1"
                />
                <Input
                  label="Weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="flex-1"
                />
                <Select
                  label="Blood"
                  name="blood"
                  value={formData.blood}
                  options={bloodTypes}
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              <Input
                label="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Input
                type="date"
                label="Joining Date"
                name="joining_day"
                value={formData.joining_day}
                onChange={handleChange}
              />
              <Select
                label="Status"
                name="status"
                value={formData.status}
                options={["Active", "Inactive"]}
                onChange={handleChange}
              />
              <Select
                label="Membership Plan"
                name="membershipPlan"
                value={formData.membershipPlan}
                options={plans.map((p) => ({
                  value: p.id,
                  label: `${p.name} (${p.duration_days} days)`,
                }))}
                onChange={handleChange}
                disabled={loading || plans.length === 0}
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  label="Fee Amount"
                  name="feeAmount"
                  value={formData.feeAmount}
                  onChange={handleChange}
                  className="flex-1"
                />
                <Input
                  label="Paid Amount"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleChange}
                  className="flex-1"
                />
                <Input
                  label="Due Amount"
                  name="dueAmount"
                  value={formData.dueAmount}
                  readOnly
                  className="flex-1 bg-gray-100"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="date"
                  label="Leave"
                  name="leave"
                  value={formData.leave}
                  onChange={handleChange}
                  className="flex-1"
                />
                <Input
                  type="date"
                  label="Rejoin"
                  name="rejoin"
                  value={formData.rejoin}
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  className = "",
  readOnly = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  </div>
);

const Select = ({ label, name, value, onChange, options, disabled = false, className = "" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      <option value="">Select</option>
      {options.map((opt) =>
        typeof opt === "string" ? (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
  </div>
);

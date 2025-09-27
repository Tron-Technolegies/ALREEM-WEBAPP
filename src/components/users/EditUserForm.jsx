import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

export default function EditUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingMember, setLoadingMember] = useState(true);

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

  // Fetch plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await API.get("members/view_plans");
        if (res.data.plans) {
          setPlans(res.data.plans);
        }
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  // Fetch member data
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await API.get(`members/update_member/${id}`);
        if (res.data) {
          const data = res.data;
          setFormData({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            age: data.age || "",
            weight: data.weight || "",
            blood: data.blood_group || "",
            location: data.location || "",
            profession: data.profession || "",
            status: data.status || "Active",
            joining_day: data.joining_date || "",
            membershipPlan: data.plan || "",
            feeAmount: data.total_fee || "",
            paidAmount: data.total_fee - data.due_amount || 0,
            dueAmount: data.due_amount || "",
            leave: data.leave_date || "",
            rejoin: data.rejoin_date || "",
          });
        }
      } catch (err) {
        console.error("Error fetching member:", err);
      } finally {
        setLoadingMember(false);
      }
    };
    fetchMember();
  }, [id]);

  // Handle input + auto due calculation
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

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("phone", formData.phone);
      payload.append("email", formData.email);
      payload.append("age", formData.age);
      payload.append("weight", formData.weight);
      payload.append("blood_group", formData.blood);
      payload.append("joining_day", formData.joining_day);
      payload.append("status", formData.status);
      payload.append("location", formData.location);
      payload.append("profession", formData.profession);
      payload.append("fee", formData.feeAmount);
      payload.append("paid", formData.paidAmount);
      payload.append("due", formData.dueAmount);
      payload.append("leave", formData.leave);
      payload.append("rejoin", formData.rejoin);
      payload.append("plan", formData.membershipPlan);
      payload.append("payment_method", "cash");

      const res = await API.post(`members/update_member/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.member_id) {
        alert("Member updated successfully!");
        navigate(-1);
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.error("Error updating member:", err.response?.data || err.message);
      alert("Update failed!");
    }
  };

  if (loadingPlans || loadingMember) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl min-h-screen p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-6 min-h-screen flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#F3F9F9] rounded-xl p-4 flex justify-between items-center mb-10">
          <p className="text-lg text-[#455154] font-bold">Edit User</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-[#0E45B7] text-white px-4 py-2 text-sm rounded-xl"
          >
            Back
          </button>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                />
              </div>

              {/* Age, Weight, Blood */}
              <div className="flex space-x-6">
                <div className="w-20">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Blood</label>
                  <select
                    name="blood"
                    value={formData.blood}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                  >
                    <option value="">Select</option>
                    {bloodTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                />
              </div>

              {/* Profession */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Joining Date */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Joining Date</label>
                <input
                  type="date"
                  name="joining_day"
                  value={formData.joining_day}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#F3F9F9] border border-gray-300 rounded-md"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#F3F9F9] border border-gray-300 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Membership Plan */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Membership Plan
                </label>
                <select
                  name="membershipPlan"
                  value={formData.membershipPlan}
                  onChange={handleChange}
                  disabled={loadingPlans || plans.length === 0}
                  className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                >
                  <option value="">Select</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} ({plan.duration_days} days)
                    </option>
                  ))}
                </select>
              </div>

              {/* Fee, Paid, Due */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Fee Amount</label>
                  <input
                    type="number"
                    name="feeAmount"
                    value={formData.feeAmount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Paid Amount
                  </label>
                  <input
                    type="number"
                    name="paidAmount"
                    value={formData.paidAmount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Due Amount</label>
                  <input
                    type="number"
                    name="dueAmount"
                    value={formData.dueAmount}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
                  />
                </div>
              </div>

              {/* Leave & Rejoin */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Leave</label>
                  <input
                    type="date"
                    name="leave"
                    value={formData.leave}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Rejoin</label>
                  <input
                    type="date"
                    name="rejoin"
                    value={formData.rejoin}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-[#F3F9F9] rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent } from "@mui/material";

export default function Dashboard() {
  // Dummy Data
  const stats = {
    activeMembers: 650,
    newMembers: 15,
    newEnquiry: 30,
    trainers: 20,
  };

  const growthData = [
    { month: "Jan", members: 20, trainers: 2 },
    { month: "Feb", members: 35, trainers: 3 },
    { month: "Mar", members: 25, trainers: 2 },
    { month: "Apr", members: 40, trainers: 4 },
    { month: "May", members: 30, trainers: 3 },
    { month: "Jun", members: 50, trainers: 5 },
    { month: "Jul", members: 45, trainers: 4 },
  ];

  const pieData = [
    { name: "Members", value: stats.activeMembers },
    { name: "Trainers & Staffs", value: stats.trainers },
  ];
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-3 gap-6 ">
        <Card>
          <CardContent className="bg-#F3F9F9">
            <h3>Active Members</h3>
            <p className="text-2xl font-bold">{stats.activeMembers}</p>
            <p className="text-green-600 text-sm">+25% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>New Members</h3>
            <p className="text-2xl font-bold">{stats.newMembers}</p>
            <p className="text-green-600 text-sm">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>New Enquiries</h3>
            <p className="text-2xl font-bold">{stats.newEnquiry}</p>
            <p className="text-green-600 text-sm">+7% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Members Growth Chart */}
        <Card>
          <CardContent>
            <h3 className="mb-4">Total Members Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="members" fill="#8884d8" />
                <Bar dataKey="trainers" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardContent>
            <h3 className="mb-4">Members vs Trainers</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

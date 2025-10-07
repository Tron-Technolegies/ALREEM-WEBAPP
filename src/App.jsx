import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import UsersListPage from "./pages/UsersListPage";
import EditUserProfileForm from "./components/users/EditUserForm";
import AddUserForm from "./components/users/AddUserForm";
import ViewStaffs from "./components/trainers&staffs/ViewStaffs";
import AddStaffs from "./components/trainers&staffs/AddStaffs";
import AttendanceOverview from "./components/attendance/AttendanceOverview";
import AccountSettings from "./components/AccountSettings";
import InvoiceHistory from "./components/InvoiceHistory";
import PendingList from "./components/pending/PendingList";
import PendingSingleUserForm from "./components/pending/PendingSingleUserForm";
import ExpiredMemberList from "./components/ExpiredMemberList";
import AddPlanForm from "./components/plans/AddPlanForm";
import SingleStaff from "./components/trainers&staffs/SingleStaff";
import EditStaff from "./components/trainers&staffs/EditStaff";
import PlansList from "./components/plans/PlanList";
import EditPlan from "./components/plans/EditPlan";
import AddBranchForm from "./components/Branch/AddBranchForm";
import BranchList from "./components/Branch/BranchList";
import AddBranchAdmin from "./components/Branchadmin/AddBranchAdmin";
import EditBranchForm from "./components/Branch/EditBranchForm";
// import Sidebar from "./components/layout/Sidebar";
// import Navbar from "./components/layout/Navbar";
// import Tron from "./pages/Tron";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          element: <Layout />,
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "users", element: <UsersListPage /> },
            { path: "users/add", element: <AddUserForm /> },
            { path: "users/:id/edit", element: <EditUserProfileForm /> },
            { path: "view/staffs", element: <ViewStaffs /> },
            {
              path: "add/staffs",
              element: <AddStaffs />,
            },
            { path: "attendance", element: <AttendanceOverview /> },
            {
              path: "invoice",
              element: <InvoiceHistory />,
            },
            { path: "pending", element: <PendingList /> },
            { path: "pending/:id/edit", element: <PendingSingleUserForm /> },
            { path: "expired", element: <ExpiredMemberList /> },
            {
              path: "settings",
              element: <AccountSettings />,
            },
            {
              path: "plans/add",
              element: <AddPlanForm />,
            },
            {
              path: "plans",
              element: <PlansList />,
            },
            {
              path: "plans/:id/edit",
              element: <EditPlan />,
            },

            { path: "staff/:id", element: <SingleStaff /> },
            { path: "edit_trainer_staff/:id", element: <EditStaff /> },

            {
              path: "add/branch",
              element: <AddBranchForm />,
            },
            {
              path: "edit_branch/:id",
              element: <EditBranchForm />,
            },
            { path: "branches", element: <BranchList /> },
            {
              path: "add/branch/admin",
              element: <AddBranchAdmin />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import UsersListPage from "./pages/UsersListPage";
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
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

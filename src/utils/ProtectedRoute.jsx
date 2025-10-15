import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token =
    localStorage.getItem("token") || document.cookie.split("; ").find((r) => r.startsWith("jwt="));

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

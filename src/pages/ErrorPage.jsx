import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f9fafb",
      }}
    >
      <h1 style={{ fontSize: "4rem", color: "#1e3a8a" }}>404</h1>
      <h2 style={{ marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ color: "#6b7280" }}>
        Sorry, you don’t have permission or this page doesn’t exist.
      </p>
      <Link
        to="/"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Go to Login
      </Link>
    </div>
  );
}

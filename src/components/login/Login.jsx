import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { FaUserAlt, FaLock } from "react-icons/fa";
import alreemlogo from "../../../public/logos/alreem-logo.png";
import "../login/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Please fill all required fields!");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      // API call to Django backend
      const response = await API.post("/members/admin_login", formData, { withCredentials: true });

      setLoading(false);

      if (response.status === 200 && response.data.status === "success") {
        // Save JWT token, role, and branch info
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        if (response.data.branch_id) {
          localStorage.setItem("branch_id", response.data.branch_id);
        }

        // Redirect based on role
        if (response.data.role === "superuser") {
          navigate("/dashboard");
        } else if (response.data.role === "branch_admin") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard"); // fallback
        }
      } else {
        setError(response.data.message || "Login failed!");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-side"></div>
      <div className="login-right-side">
        <div className="alreem-logo">
          <img src={alreemlogo} alt="alreem-logo" />
        </div>
        <div className="alreem-login">
          <div className="alreem-login-heading">
            <h2>Login</h2>
            <p>Please fill your information below</p>
          </div>
          <div className="login-inputs">
            <div className="input-with-icon">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

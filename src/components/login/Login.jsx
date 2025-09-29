import React, { useState } from "react";
import "../login/Login.css";
import API from "../../utils/api";
import { FaUserAlt, FaMobile, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import alreemlogo from "../../../public/logos/alreem-logo.png";

const Login = () => {
  const navigate = useNavigate();

  // State to store input values
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
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

      const response = await API.post("/members/admin_login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 200 && data.status === "success") {
        // Login successful
        navigate("/dashboard");
      } else {
        // Login failed
        setError(data.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
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
              <FaEnvelope className="input-icon" />
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

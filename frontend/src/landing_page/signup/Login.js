import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        window.location.href = DASHBOARD_URL;
        return;
      }

      setMessage(data.message || "Login failed");
    } catch (error) {
      const status = error.response?.status;
      const backendMessage = error.response?.data?.message;
      const fallback = error.message || "Login failed";
      setMessage(status ? `${status}: ${backendMessage || fallback}` : fallback);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="auth-subtitle">Enter your credentials.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <button type="submit">Login</button>
        </form>

        {message ? <p className="auth-message">{message}</p> : null}

        <p className="auth-switch">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

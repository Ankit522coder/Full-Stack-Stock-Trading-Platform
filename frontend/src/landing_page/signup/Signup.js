import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import redirectToDashboard from "./redirectToDashboard";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
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
        `${API_BASE_URL}/auth/signup`,
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        await redirectToDashboard(data.token);
        return;
      }

      setMessage(data.message || "Signup failed");
    } catch (error) {
      const status = error.response?.status;
      const backendMessage = error.response?.data?.message;
      const fallback = error.message || "Signup failed";
      setMessage(status ? `${status}: ${backendMessage || fallback}` : fallback);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Sign up to access your dashboard.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Sign up</button>
        </form>

        {message ? <p className="auth-message">{message}</p> : null}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;



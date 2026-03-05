import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

function AuthHome() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/verify`,
          {},
          { withCredentials: true }
        );

        if (data.status) {
          setUsername(data.user?.username || "User");
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  if (loading) {
    return <div className="auth-page"><p>Checking session...</p></div>;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome {username}</h2>
        <p className="auth-subtitle">Your session is active.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default AuthHome;

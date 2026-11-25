import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

function AuthHome() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Unable to verify session:", error);
          setErrorMessage(
            "Unable to check your session. Check your connection and try again."
          );
        }
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

  if (errorMessage) {
    return (
      <div className="auth-page">
        <div className="auth-card" role="alert">
          <p>{errorMessage}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    );
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



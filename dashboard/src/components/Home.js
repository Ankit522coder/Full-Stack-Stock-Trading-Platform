import React, { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
const LANDING_URL = process.env.REACT_APP_LANDING_URL || "http://localhost:3000";

const Home = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/verify`,
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          window.location.href = `${LANDING_URL}/login`;
          return;
        }

        setUsername(data.user?.username || "");
      } catch (error) {
        window.location.href = `${LANDING_URL}/login`;
        return;
      } finally {
        setIsChecking(false);
      }
    };

    verifySession();
  }, []);

  if (isChecking) {
    return <div style={{ padding: "24px" }}>Checking session...</div>;
  }

  return (
    <>
      <TopBar username={username} />
      <Dashboard username={username} />
    </>
  );
};

export default Home;

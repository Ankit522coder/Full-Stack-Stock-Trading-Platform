import React, { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { LANDING_URL } from "../config";

const Home = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await axios.post(
          "/auth/verify",
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          window.location.href = `${LANDING_URL}/login`;
          return;
        }

        setUsername(data.user?.username || "");
      } catch (error) {
        if (error.response?.status === 401) {
          window.location.href = `${LANDING_URL}/login`;
          return;
        }

        console.error("Unable to verify session:", error);
        setSessionError(
          "Unable to check your session. Check your connection and try again."
        );
      } finally {
        setIsChecking(false);
      }
    };

    verifySession();
  }, []);

  if (isChecking) {
    return <div style={{ padding: "24px" }}>Checking session...</div>;
  }

  if (sessionError) {
    return (
      <div style={{ padding: "24px" }} role="alert">
        <p>{sessionError}</p>
        <button type="button" onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      <TopBar username={username} />
      <Dashboard username={username} />
    </>
  );
};

export default Home;

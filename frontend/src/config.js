const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const API_BASE_URL = (
  process.env.REACT_APP_API_URL ||
  (isLocalhost
    ? "http://localhost:3002"
    : "https://zerodha-backend-lp6r.onrender.com")
).replace(/\/$/, "");

export const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL ||
  (isLocalhost ? "http://localhost:3001" : "https://zerodha-dashboard-xi.vercel.app");

export const LANDING_URL =
  process.env.REACT_APP_LANDING_URL ||
  (isLocalhost ? "http://localhost:3000" : "https://zerodha-frontend-taupe.vercel.app");

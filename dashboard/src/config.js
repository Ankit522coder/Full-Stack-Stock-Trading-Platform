const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const API_BASE_URL = (
  process.env.REACT_APP_API_URL ||
  (isLocalhost
    ? "http://localhost:3002"
    : "https://zerodha-backend-lp6r.onrender.com")
).replace(/\/$/, "");

export const LANDING_URL =
  process.env.REACT_APP_LANDING_URL ||
  (isLocalhost ? "http://localhost:3000" : "https://zerodha-frontend-taupe.vercel.app");

const handoffToken = new URLSearchParams(window.location.hash.slice(1)).get("token");
if (handoffToken) {
  sessionStorage.setItem("authToken", handoffToken);
  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}${window.location.search}`
  );
}

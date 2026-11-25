import axios from "axios";
import { API_BASE_URL, DASHBOARD_URL } from "../../config";

const redirectToDashboard = async (token) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/verify`,
      {},
      { withCredentials: true }
    );

    if (data.status) {
      window.location.assign(DASHBOARD_URL);
      return;
    }
  } catch (error) {
    if (error.response?.status !== 401) {
      throw error;
    }
  }

  if (!token) {
    throw new Error(
      "Authentication succeeded, but no dashboard session token was returned."
    );
  }

  const dashboardUrl = new URL(DASHBOARD_URL);
  dashboardUrl.hash = `token=${encodeURIComponent(token)}`;
  window.location.assign(dashboardUrl.toString());
};

export default redirectToDashboard;

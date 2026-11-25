# Full-Stack-Zerodha-Project

## Production deployment settings

The login site, dashboard, and API are separate origins. Configure these values
before deploying so the dashboard can reach the same authenticated API session:

- **Vercel login site** (`frontend`): `REACT_APP_API_URL=https://zerodha-backend-lp6r.onrender.com`
  and `REACT_APP_DASHBOARD_URL=https://zerodha-dashboard-xi.vercel.app`.
- **Vercel dashboard** (`dashboard`): `REACT_APP_API_URL=https://zerodha-backend-lp6r.onrender.com`
  and `REACT_APP_LANDING_URL=https://zerodha-frontend-taupe.vercel.app`.
- **Render API**: `FRONTEND_URL=https://zerodha-frontend-taupe.vercel.app` and
  `DASHBOARD_URL=https://zerodha-dashboard-xi.vercel.app`. Keep `MONGO_URL` and
  `TOKEN_KEY` configured as well.

Rebuild both Vercel projects and restart the Render service after changing
environment variables. Local development continues to use ports 3000, 3001,
and 3002 when no deployment variables are set.

After login or signup, the frontend verifies the cookie session before opening
the dashboard. If the browser blocks the cross-site API cookie, it hands the
issued token to the dashboard through the URL fragment; the dashboard removes
the fragment immediately and keeps the token only in that tab's session
storage.
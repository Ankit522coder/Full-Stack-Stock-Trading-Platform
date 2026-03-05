const isProduction = process.env.NODE_ENV === "production";

const getAuthCookieOptions = () => ({
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: 3 * 24 * 60 * 60 * 1000,
  path: "/",
});

module.exports = { getAuthCookieOptions };

const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const { getAuthCookieOptions } = require("../util/cookieOptions");

const userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(data.id).select("username email");

    if (!user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    return res.status(200).json({ status: true, user });
  } catch (error) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(data.id).select("username email");

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

const Logout = (req, res) => {
  res.clearCookie("token", getAuthCookieOptions());

  return res.status(200).json({ success: true, message: "Logged out" });
};

module.exports = { userVerification, authenticateUser, Logout };

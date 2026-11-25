const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const { getAuthCookieOptions } = require("../util/cookieOptions");
const bcrypt = require("bcryptjs");

const normalizeEmail = (email = "") => email.trim().toLowerCase();

module.exports.Signup = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = req.body.password;
    const username = req.body.username?.trim();

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "username, email and password are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);

    res.cookie("token", token, getAuthCookieOptions());

    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      token,
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    if (error?.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(", "),
        success: false,
      });
    }

    console.error("Signup error:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, getAuthCookieOptions());

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

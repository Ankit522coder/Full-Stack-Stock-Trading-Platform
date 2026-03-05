const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification, Logout } = require("../Middleware/AuthMiddleware");

const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify", userVerification);
router.post("/logout", Logout);

module.exports = router;

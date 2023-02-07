const express = require("express");
const router = express.Router();

const { login, register, logout } = require("../controllers/authController");

/* LOGIN/REGISTER */
// Only render the pages
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
// Routes with controller functionality
router.get("/logout", logout);
router.post("/login", login);
router.post("/register", register);

module.exports = router;

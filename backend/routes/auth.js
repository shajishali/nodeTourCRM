// backend/routes/auth.js
const express = require("express");
const router = express.Router();

// Mock users — replace this with your DB logic
const users = [
  { id: 1, email: "admin@gmail.com", password: "admin123", role: "admin" },
  { id: 2, email: "user@gmail.com", password: "user123", role: "user" },
];

// POST /api/login
router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Remove password from user object before sending
  const { password: _, ...userWithoutPassword } = user;

  res.json({ user: userWithoutPassword });
});

module.exports = router;

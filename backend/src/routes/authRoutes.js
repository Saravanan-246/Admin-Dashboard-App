import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router(); // <-- Correct

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // Static admin login from .env
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      success: true,
      message: "Login successful",
      user: { email },
      token: "static-login-ok", // optional
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});

export default router;

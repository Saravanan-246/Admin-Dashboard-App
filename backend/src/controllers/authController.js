import dotenv from "dotenv";
dotenv.config();

// SIMPLE STATIC LOGIN SYSTEM
export const loginController = (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // Check admin login from .env
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "Login successful",
      adminEmail: email
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
};

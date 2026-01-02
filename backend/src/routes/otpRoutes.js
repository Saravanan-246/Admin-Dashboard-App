import express from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// ----- RATE LIMIT: Max 3 OTP requests per 1 minute -----
const otpLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: { message: "Too many OTP requests. Try again later." }
});

// SEND OTP
router.post("/send", otpLimiter, async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent resend spam - 60 sec cooldown
    if (user.lastOtpSent && Date.now() - user.lastOtpSent < 60 * 1000) {
      return res.status(429).json({
        message: `Wait ${Math.ceil((60000 - (Date.now() - user.lastOtpSent)) / 1000)} seconds to resend OTP.`
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP before storing
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    user.lastOtpSent = Date.now();
    await user.save();

    // SEND MAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Admin Portal" <${process.env.EMAIL}>`,
      to: email,
      subject: "🔐 OTP Verification Code",
      html: `
        <div style="text-align:center;font-family:sans-serif;">
          <h2>🔐 Verification OTP</h2>
          <p style="font-size:22px;font-weight:bold;">${otp}</p>
          <p>Valid for <b>5 minutes</b>.</p>
        </div>
      `,
    });

    res.json({ message: "OTP sent successfully!" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error sending OTP" });
  }
});

// VERIFY OTP
router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.otp) return res.status(400).json({ message: "Request OTP first" });

  if (user.otpExpire < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  // Compare hashed OTP
  const validOtp = await bcrypt.compare(otp, user.otp);

  if (!validOtp)
    return res.status(400).json({ message: "Invalid OTP" });

  // Clear OTP after success
  user.otp = null;
  user.otpExpire = null;
  await user.save();

  res.json({ message: "OTP Verified 🎉" });
});

export default router;

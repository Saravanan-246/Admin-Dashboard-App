import Otp from "../models/Otp.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2 min expiration
    });

    // Email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    await transporter.sendMail({
      from: `"Admin Portal" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP is ${otp}. It expires in 2 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!record) return res.status(400).json({ message: "OTP not found" });

    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    if (record.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    res.json({ success: true, message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed", error });
  }
};

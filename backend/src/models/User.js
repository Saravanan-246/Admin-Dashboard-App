import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },

    // if you don't use password now, make this NOT required
    passwordHash: { type: String },

    otp: { type: String },
    otpExpiry: { type: Date },
    lastOtpSent: { type: Date },
    otpAttempts: { type: Number, default: 0 },

    isVerified: { type: Boolean, default: false },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

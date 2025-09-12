const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// Generate OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Request OTP
router.post("/request-otp", async (req, res) => {
  const { email } = req.body;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Valid email required." });
  }

  const otp = generateOtp();
  const otpTimestamp = new Date();

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      // Insert a new row with OTP only
      await db.query(
        "INSERT INTO users (username, email, password, created_at, otp, otp_timestamp) VALUES ($1, $2, $3, $4, $5, $6)",
        [null, email, null, new Date(), otp, otpTimestamp]
      );
    } else {
      // Update OTP for existing row
      await db.query(
        "UPDATE users SET otp = $1, otp_timestamp = $2 WHERE email = $3",
        [otp, otpTimestamp, email]
      );
    }

    // Send OTP email
    await transporter.sendMail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP error:", err);
    res.status(500).json({ error: "Failed to send OTP." });
  }
});

// Signup with OTP
router.post("/signup", async (req, res) => {
  const { username, email, password, otp } = req.body;

  if (!username || !email || !password || !otp) {
    return res.status(400).json({ error: "All fields required." });
  }

  try {
    const result = await db.query(
      "SELECT otp, otp_timestamp, password FROM users WHERE email = $1",
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: "Please request OTP first." });
    }

    if (user.password) {
      return res.status(400).json({ error: "User already exists." });
    }

    const now = new Date();
    const otpValid =
      user.otp === otp && now - new Date(user.otp_timestamp) < 10 * 60 * 1000;

    if (!otpValid) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET username = $1, password = $2, otp = NULL, otp_timestamp = NULL WHERE email = $3",
      [username, hashedPassword, email]
    );

    res.json({ success: true, message: "Signup completed successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed." });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP required." });
  }

  try {
    const result = await db.query(
      "SELECT otp, otp_timestamp FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Email not found." });
    }

    const user = result.rows[0];

    if (!user.otp || !user.otp_timestamp) {
      return res
        .status(400)
        .json({ error: "No OTP requested for this email." });
    }

    const now = new Date();
    const otpValid =
      String(user.otp) === String(otp) &&
      now - new Date(user.otp_timestamp) < 10 * 60 * 1000; // 10 min expiry

    if (!otpValid) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }
    await db.query(
      "UPDATE users SET otp = NULL, otp_timestamp = NULL WHERE email = $1",
      [email]
    );

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    console.error("Verify OTP error:", err.message || err);
    res.status(500).json({ error: "OTP verification failed." });
  }
});

module.exports = router;

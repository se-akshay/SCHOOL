const express = require("express");
const router = express.Router();
const db = require("../db");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "school_images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// Email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /schools
router.post("/", upload.single("image"), async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  // Validation
  if (!name || !address || !city || !state || !contact || !email_id) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (!isValidEmail(email_id)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, address, city, state, contact, imageUrl, email_id]
    );
    res.status(201).json({ message: "School added successfully." });
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
    res.status(500).json({ error: "Database error." });
  }
});

// GET /schools
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, address, city, state, contact, email_id, image FROM schools"
    );
    const rows = result.rows;
    // Add full image URL
    const schools = rows.map((school) => ({
      ...school,
      image: school.image || "",
    }));
    res.json(schools);
  } catch (err) {
    console.error(err.stack || JSON.stringify(err, null, 2) || err);
    res.status(500).json({ error: "Database error." });
  }
});

module.exports = router;

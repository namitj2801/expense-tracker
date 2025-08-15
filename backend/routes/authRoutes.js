const express = require("express");
const { protect } = require("../middleware/authMiddleware");

// Import authentication controller functions
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controller/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Public routes (no authentication required)
router.post("/register", registerUser); // User registration endpoint
router.post("/login", loginUser); // User login endpoint

// Protected routes (authentication required)
router.get("/getuser", protect, getUserInfo); // Get current user information

// Profile image upload endpoint with file validation
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "Please upload a file" });
  }
  // Generate full URL for uploaded image
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;

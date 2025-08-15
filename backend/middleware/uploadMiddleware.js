const multer = require("multer");

// Configure storage for file uploads - saves files to disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to uploads directory
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp to avoid conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter files by MIME type to allow only image uploads
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .jpeg .jpg and .png formats are allowed"), false); // Reject the file
  }
};

// Create multer instance with configured storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload;

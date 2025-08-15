const express = require("express");

// Import income controller functions
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controller/incomeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All income routes require authentication
router.post("/add", protect, addIncome); // Create new income entry
router.get("/get", protect, getAllIncome); // Retrieve all user income sources
router.delete("/delete/:id", protect, deleteIncome); // Remove income by ID
router.get("/downloadexcel", protect, downloadIncomeExcel); // Export income data to Excel

module.exports = router;

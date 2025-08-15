const express = require("express");

// Import expense controller functions
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controller/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All expense routes require authentication
router.post("/add", protect, addExpense); // Create new expense entry
router.get("/get", protect, getAllExpense); // Retrieve all user expenses
router.delete("/delete/:id", protect, deleteExpense); // Remove expense by ID
router.get("/downloadexcel", protect, downloadExpenseExcel); // Export expenses to Excel

module.exports = router;

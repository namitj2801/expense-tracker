const express = require("express");

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncome,
  downloadIncomeExcel,
} = require("../controller/incomeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/all", protect, getAllIncome);
router.delete("/delete/:id", protect, deleteIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);

module.exports = router;

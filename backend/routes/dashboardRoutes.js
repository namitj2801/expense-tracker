const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controller/dashboardController");

const router = express.Router();

// Protected route to get comprehensive financial dashboard data
router.get("/", protect, getDashboardData);

module.exports = router;

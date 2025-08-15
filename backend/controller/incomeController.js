// const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");

// Create new income entry for authenticated user
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validate required fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new income instance with user ID and income details
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date), // Convert string date to Date object
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Retrieve all income sources for authenticated user, sorted by date (newest first)
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove income entry by ID
exports.deleteIncome = async (req, res) => {
  //   const userId = req.user.id;

  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server Error while deleting the Income" });
  }
};

// Generate and download income data as Excel file
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    // Fetch user's income sources sorted by date
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Format data for Excel export
    const data = income.map((items) => ({
      Source: items.source,
      Amount: items.amount,
      Date: items.date,
    }));

    // Create Excel workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Write file to disk and send for download
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ message: "Server Error while downloading Income excel" });
  }
};

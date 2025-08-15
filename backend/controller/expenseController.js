// const User = require("../models/User");
const Expense = require("../models/Expense");
const xlsx = require("xlsx");

// Create new expense entry for authenticated user
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    // Validate required fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new expense instance with user ID and expense details
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date), // Convert string date to Date object
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Retrieve all expenses for authenticated user, sorted by date (newest first)
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove expense entry by ID
exports.deleteExpense = async (req, res) => {
  //   const userId = req.user.id;

  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ message: "Server Error while deleting the Expense" });
  }
};

// Generate and download expense data as Excel file
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    // Fetch user's expenses sorted by date
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Format data for Excel export
    const data = expense.map((items) => ({
      Category: items.category,
      Amount: items.amount,
      Date: items.date,
    }));

    // Create Excel workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // Write file to disk and send for download
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ message: "Server Error while downloading Expense excel" });
  }
};

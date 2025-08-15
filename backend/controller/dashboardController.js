const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// Retrieve comprehensive financial dashboard data for authenticated user
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate user ID format
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const userObjectId = new Types.ObjectId(String(userId)); // Convert to ObjectId for MongoDB queries

    // Calculate total income and expenses using MongoDB aggregation
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // Calculate income for the last 30 days
    const last30DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Date 30 days ago
    })
      .sort({ date: -1 })
      .lean();

    const incomeLast30Days = last30DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Calculate expenses for the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Date 30 days ago
    })
      .sort({ date: -1 })
      .lean();

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Combine and sort last 5 income and expense transactions
    const lastTransactions = [
      ...(
        await Income.find({ userId: userObjectId })
          .sort({ date: -1 })
          .limit(5)
          .lean()
      ).map((txn) => ({
        ...txn, // Add type identifier for frontend processing
        type: "income",
      })),
      ...(
        await Expense.find({ userId: userObjectId })
          .sort({ date: -1 })
          .limit(5)
          .lean()
      ).map((txn) => ({
        ...txn, // Add type identifier for frontend processing
        type: "expense",
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

    console.log("✅ Sending dashboard data response");

    // Return comprehensive financial summary
    return res.status(200).json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last30daysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last30daysIncome: {
        total: incomeLast30Days,
        transactions: last30DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });

    console.log("⚠ This should never log if return works");
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Failed to get Dashboard Data", error });
  }
};

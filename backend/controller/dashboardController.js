const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const userObjectId = new Types.ObjectId(String(userId)); // added String()

    // Total income & expenses
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

    // Income last 30 days
    const last30DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .lean();

    const incomeLast30Days = last30DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Expenses last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .lean();

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 5 transactions combined
    const lastTransactions = [
      ...(
        await Income.find({ userId: userObjectId })
          .sort({ date: -1 })
          .limit(5)
          .lean()
      ).map((txn) => ({
        ...txn, // .toObject()?
        type: "income",
      })),
      ...(
        await Expense.find({ userId: userObjectId })
          .sort({ date: -1 })
          .limit(5)
          .lean()
      ).map((txn) => ({
        ...txn, // .toObject()?
        type: "expense",
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log("✅ Sending dashboard data response");

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

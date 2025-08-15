const mongoose = require("mongoose");

// Expense schema for tracking user spending with categories and amounts
const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model for relationship
      required: true,
    },
    icon: {
      type: String, // Emoji or icon representation for the expense category
    },
    category: {
      type: String,
      required: true, // Expense category (e.g., food, transport, entertainment)
    },
    amount: {
      type: Number,
      required: true, // Expense amount in currency units
    },
    date: {
      type: Date,
      default: Date.now, // Defaults to current date if not specified
    },
  },
  { timestamps: true } // Automatically tracks creation and update times
);

module.exports = mongoose.model("Expense", ExpenseSchema);

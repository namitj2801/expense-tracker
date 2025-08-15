const mongoose = require("mongoose");

// Income schema for tracking user earnings from various sources
const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model for relationship
      required: true,
    },
    icon: {
      type: String, // Emoji or icon representation for the income source
    },
    source: {
      type: String,
      required: true, // Income source (e.g., salary, freelance, investment)
    },
    amount: {
      type: Number,
      required: true, // Income amount in currency units
    },
    date: {
      type: Date,
      default: Date.now, // Defaults to current date if not specified
    },
  },
  { timestamps: true } // Automatically tracks creation and update times
);

module.exports = mongoose.model("Income", IncomeSchema);

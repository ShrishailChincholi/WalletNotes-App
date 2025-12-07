const mongoose = require("mongoose");

const BudgetModule = new mongoose.Schema(
  {
    budget: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", BudgetModule);
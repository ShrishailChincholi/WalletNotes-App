const mongoose = require('mongoose');

const SavingGoalsModules = mongoose.Schema(
    {
        title: { type: String, required: true },
        targetAmount: { type: Number, required: true },
        savedAmount: { type: Number, required: true },
    },
    { timestamp: true }
);

module.exports = mongoose.model("SavingGoals", SavingGoalsModules);
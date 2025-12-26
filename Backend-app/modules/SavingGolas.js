const mongoose = require('mongoose');

const SavingGoalsModules = mongoose.Schema(
    {
        title: { type: String, required: true },
        targetAmount: { type: Number, required: true },
        savedAmount: { type: Number, required: true },
        useerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model("SavingGoals", SavingGoalsModules);
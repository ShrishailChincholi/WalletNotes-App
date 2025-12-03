const mongoose = require('mongoose');

const SavingGoalsModules = mongoose.Schema(
    {
        title: { type: String, require: true },
        targetamout: { type: Number, require: true },
        saveamount: { type: Number, require: true },
    },
    {timestamp:true}
);

module.exports = mongoose.model("SavingGoals", SavingGoalsModules);
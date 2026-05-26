const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: String
    }
});

module.exports = mongoose.model("Budget", budgetSchema);
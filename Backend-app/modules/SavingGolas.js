const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    targetDate: {
        type: Date
    }
});

module.exports = mongoose.model("Goal", goalSchema);
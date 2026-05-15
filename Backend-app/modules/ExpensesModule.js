// modules/ExpensesModule.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {  //  Make sure this field exists
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,  // Make it required
        index: true      // Add index for better query performance
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    about: {
        type: String,
        default: ''
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Expense', expenseSchema);
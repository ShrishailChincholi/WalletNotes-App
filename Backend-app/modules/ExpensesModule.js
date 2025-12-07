const mongoose = require('mongoose')
const ExpensesModule = mongoose.Schema(
    {

        title: {
            type: String,
            require: true
        },
        amount: {
            type: Number,
            require: true
        },

        paymentMethod: {
            type: String,
            require: true
        },
        Date: {
            type: Date,
            default:Date.now
        },
        about:{
            type:String,
            require: true
        }
    }
)

module.exports = mongoose.model("Expense",ExpensesModule)
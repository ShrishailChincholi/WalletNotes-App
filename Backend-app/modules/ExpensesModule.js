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

        Paymentmethoda: {
            type: String
        },
        Date: {
            type: Date,
            default:Date.now
        },
        about:{
            type:String
        }
    }
)

module.exports = mongoose.model("Expense",ExpensesModule)
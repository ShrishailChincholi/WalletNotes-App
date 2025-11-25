const ExpensesModule = require("../modules/ExpensesModule");

const ExpenseAdd = async (req, res) => {
    try {
        const { title, amount, Paymenthoda, Date, about } = req.body;
        const AddNewExp = new ExpensesModule({
            title: title,
            amount: amount,
            Paymenthoda: Paymenthoda,
            Date: Date,
            about: about,
        })
        await AddNewExp.save();
        console.log("Expense Added Succsefully")
    } catch (error) {
        console.log("Error in Adding Expense ");
    }
};

module.exports = ExpenseAdd;
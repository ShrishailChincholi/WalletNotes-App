const ExpensesModule = require("../modules/ExpensesModule");

const ExpenseAdd = async (req, res) => {
    try {
        const { title, amount, paymentMethod, Date, about } = req.body;
        const AddNewExp = new ExpensesModule({
            title: title,
            amount: amount,
            paymentMethod: paymentMethod,
            Date: Date,
            about: about,
        })
        await AddNewExp.save();
        res.status(201).json({
            success: true,
            message: "Expense Saved Successfully!"
        });
        console.log("Expense Added Succsefully")
    } catch (error) {
        console.log(`Error in Adding Expense =${error} `, error);
    }
};

module.exports = ExpenseAdd;
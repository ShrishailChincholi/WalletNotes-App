// controller/expense.controllers.js
const ExpensesModule = require("../modules/ExpensesModule");

// POST - Add Expense
const ExpenseAdd = async (req, res) => {
    try {
        const { title, amount, paymentMethod, Date, about } = req.body;
        
        const AddNewExp = new ExpensesModule({
            title: title,
            amount: amount,
            paymentMethod: paymentMethod,
            Date: Date,
            about: about,
            userId: req.userId  
        });

        await AddNewExp.save();
        
        res.status(201).json({
            success: true,
            message: "Expense Saved Successfully!",
            data: AddNewExp
        });
        console.log("Expense Added Successfully for user:", req.userId);
        
    } catch (error) {
        console.log(`Error in Adding Expense = ${error}`, error);
        res.status(500).json({ 
            success: false,
            message: "Failed to add expense",
            error: error.message
        });
    }
};

const GetAllExpenses = async (req, res) => {
    try {
      
        const expenses = await ExpensesModule.find({ userId: req.userId });
        
        res.status(200).json({
            success: true,
            data: expenses,
            count: expenses.length
        });
        
    } catch (error) {
        console.log(`Error in Fetching Expenses = ${error}`, error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch expenses",
            error: error.message
        });
    }
};

//  ADD THIS - Update Expense
const UpdateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { title, amount, paymentMethod, Date, about } = req.body;
        
        // Ensure user owns the expense before updating
        const updatedExpense = await ExpensesModule.findOneAndUpdate(
            { _id: expenseId, userId: req.userId }, // Check ownership
            { title, amount, paymentMethod, Date, about },
            { new: true } // Return updated document
        );
        
        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found or unauthorized"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: updatedExpense
        });
        
    } catch (error) {
        console.log(`Error in Updating Expense = ${error}`, error);
        res.status(500).json({
            success: false,
            message: "Failed to update expense",
            error: error.message
        });
    }
};

//  ADD THIS - Delete Expense
const DeleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        
        // Ensure user owns the expense before deleting
        const deletedExpense = await ExpensesModule.findOneAndDelete({
            _id: expenseId,
            userId: req.userId
        });
        
        if (!deletedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found or unauthorized"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });
        
    } catch (error) {
        console.log(`Error in Deleting Expense = ${error}`, error);
        res.status(500).json({
            success: false,
            message: "Failed to delete expense",
            error: error.message
        });
    }
};

module.exports = { 
    ExpenseAdd, 
    GetAllExpenses, 
    UpdateExpense, 
    DeleteExpense 
};
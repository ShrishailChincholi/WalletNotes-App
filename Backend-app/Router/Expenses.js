// Router/Expenses.js
const express = require('express');
const { 
    ExpenseAdd, 
    GetAllExpenses, 
    UpdateExpense, 
    DeleteExpense 
} = require('../controller/expense.controllers');
const authmiddleware = require('../middleware/auth');

const ExpenseRouter = express.Router();

// Apply auth middleware to all routes
ExpenseRouter.use(authmiddleware);

// Define routes
ExpenseRouter.post('/', ExpenseAdd);           // Add expense
ExpenseRouter.get('/', GetAllExpenses);        // Get all user expenses
ExpenseRouter.put('/:id', UpdateExpense);      // Update expense
ExpenseRouter.delete('/:id', DeleteExpense);   // Delete expense

module.exports = ExpenseRouter;
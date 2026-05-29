const express = require('express');

const {
    ExpenseAdd,
    GetAllExpenses,
    UpdateExpense,
    DeleteExpense
} = require('../controller/expense.controllers');

const authmiddleware = require('../middleware/auth.js');

const ExpenseRouter = express.Router();

ExpenseRouter.use(authmiddleware);

// ROUTES
ExpenseRouter.post('/', ExpenseAdd);

ExpenseRouter.get('/', GetAllExpenses);

ExpenseRouter.put('/:id', UpdateExpense);

ExpenseRouter.delete('/:id', DeleteExpense);

module.exports = ExpenseRouter;
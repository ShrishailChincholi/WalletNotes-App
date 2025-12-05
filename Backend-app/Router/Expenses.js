const express = require('express');
const ExpenseAdd = require('../controller/expense.controllers');
const ExpenseRouter = express.Router();

ExpenseRouter.post('/',ExpenseAdd);

module.exports = ExpenseRouter;
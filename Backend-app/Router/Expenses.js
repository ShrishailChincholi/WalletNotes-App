const express = require('express');
const ExpenseAdd = require('../controller/expense.controllers');
const authmiddleware = require('../middleware/auth');
const ExpenseRouter = express.Router();

ExpenseRouter.post('/',authmiddleware,ExpenseAdd);

module.exports = ExpenseRouter;
const express = require('express');
const ExpenseAdd = require('../controller/expense.controllers');
const router = express.Router();


router.post('/',ExpenseAdd)

module.exports = router
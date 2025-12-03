const express = require('express');
const { route } = require('./Addnotes');
const SavingGoalsController = require('../controller/SavGoals');
// const getGoalsController = require('../controller/SavGoals');
const goalsrouter = express.Router();

goalsrouter.post('/',SavingGoalsController);


module.exports = goalsrouter;
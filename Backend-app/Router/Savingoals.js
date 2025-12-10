const express = require('express');
const { route } = require('./Addnotes');
const {SavingGoalsController, UpdateGoals, DeleteGoals,} = require('../controller/SavGoals');
// const getGoalsController = require('../controller/SavGoals');
const goalsrouter = express.Router();

goalsrouter.post('/',SavingGoalsController);
goalsrouter.put('/:id',UpdateGoals);
goalsrouter.delete('/:id',DeleteGoals);


module.exports = goalsrouter;
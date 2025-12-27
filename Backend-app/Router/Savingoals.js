const express = require('express');
const { route } = require('./Addnotes');
const {SavingGoalsController, UpdateGoals, DeleteGoals,} = require('../controller/SavGoals');
const authmiddleware = require('../middleware/auth');
// const getGoalsController = require('../controller/SavGoals');
const goalsrouter = express.Router();

goalsrouter.post('/',authmiddleware,SavingGoalsController);
goalsrouter.put('/:id',authmiddleware,UpdateGoals);
goalsrouter.delete('/:id',authmiddleware,DeleteGoals);


module.exports = goalsrouter;
const express = require('express');

const {
    SavingGoalsController,
    getGoalsController,
    UpdateGoals,
    DeleteGoals,
} = require('../controller/SavGoals');

const authmiddleware = require('../middleware/auth.js');

const goalsrouter = express.Router();
goalsrouter.use(authmiddleware);
goalsrouter.post('/', SavingGoalsController);
goalsrouter.get('/', getGoalsController);
goalsrouter.put('/:id', UpdateGoals);
goalsrouter.delete('/:id', DeleteGoals);

module.exports = goalsrouter;
const express = require('express');

const SpendBugetController = require('../controller/spendBudget.Controjs');

const authmiddleware = require('../middleware/auth.js');

const SpendBugetRoute = express.Router();


// SAVE OR UPDATE BUDGET
SpendBugetRoute.post(
    '/',
    authmiddleware,
    SpendBugetController
);

module.exports = SpendBugetRoute;
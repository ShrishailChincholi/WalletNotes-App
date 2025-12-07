const express = require('express');
const SpendBugetController = require('../controller/spendBudget.Controjs');
const SpendBugetRoute = express.Router();


SpendBugetRoute.post('/',SpendBugetController);

module.exports = SpendBugetRoute
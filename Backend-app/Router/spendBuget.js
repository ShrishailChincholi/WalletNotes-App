const express = require('express');
const SpendBugetController = require('../controller/spendBudget.Controjs');
const authmiddleware = require('../middleware/auth');
const SpendBugetRoute = express.Router();


SpendBugetRoute.post('/',authmiddleware,SpendBugetController);

module.exports = SpendBugetRoute
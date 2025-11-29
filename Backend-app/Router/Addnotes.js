const express = require('express');
const Addnote = require('../controller/addnotes.controller');
const routernotes = express.Router();

routernotes.post('/',Addnote);

module.exports = routernotes;
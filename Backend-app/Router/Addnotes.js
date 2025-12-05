const express = require('express');
const {Addnote,getnotes} = require('../controller/addnotes.controller');
const routernotes = express.Router();

routernotes.post('/',Addnote);
routernotes.get('/',getnotes)

module.exports = routernotes;
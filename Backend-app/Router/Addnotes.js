const express = require('express');
const {Addnote,getnotes,updateNotes,
    deleteNote,
} = require('../controller/addnotes.controller');
const routernotes = express.Router();

routernotes.post('/',Addnote);
routernotes.get('/',getnotes);
routernotes.put("/:id",updateNotes);
routernotes.delete('/:id',deleteNote)

module.exports = routernotes;
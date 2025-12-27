const express = require('express');
const { 
    Addnote,
    getnotes,
    updateNotes,
    deleteNote,
    getSingleNote,
} = require('../controller/addnotes.controller');

const authmiddleware = require('../middleware/auth');
const routernotes = express.Router();

routernotes.post('/', authmiddleware, Addnote);
routernotes.get('/', authmiddleware, getnotes);
routernotes.get('/:id', authmiddleware, getSingleNote);
routernotes.put("/:id", authmiddleware, updateNotes);
routernotes.delete('/:id', authmiddleware, deleteNote)

module.exports = routernotes;
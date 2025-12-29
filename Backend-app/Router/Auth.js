const express = require('express');
const { registerUser, login, updataeuser } = require('../controller/user');
const authmiddleware = require('../middleware/auth');
const AuthorizationRouter = express.Router();

AuthorizationRouter.post('/Register',registerUser);
AuthorizationRouter.post('/login',login);
AuthorizationRouter.put('/update',authmiddleware,updataeuser);


module.exports = AuthorizationRouter;
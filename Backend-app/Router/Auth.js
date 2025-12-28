const express = require('express');
const { registerUser, login, updataeuser } = require('../controller/user');
const AuthorizationRouter = express.Router();

AuthorizationRouter.post('/Register',registerUser);
AuthorizationRouter.post('/login',login);
AuthorizationRouter.put('/update',updataeuser);


module.exports = AuthorizationRouter;
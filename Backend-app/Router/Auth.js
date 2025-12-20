const express = require('express');
const { registerUser, login } = require('../controller/user');
const AuthorizationRouter = express.Router();

AuthorizationRouter.post('/Register',registerUser);
AuthorizationRouter.post('/login',login);


module.exports = AuthorizationRouter;
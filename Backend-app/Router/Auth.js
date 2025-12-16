const express = require('express');
const { registerUser } = require('../controller/user');
const AuthorizationRouter = express.Router();

AuthorizationRouter.post('',registerUser);

module.exports = AuthorizationRouter;
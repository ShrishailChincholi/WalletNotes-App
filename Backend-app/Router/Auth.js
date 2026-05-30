const express = require('express');
const multer = require("multer");
const { registerUser, login, updataeuser, uploadProfileImage, getProfile } = require('../controller/user');
const authmiddleware = require('../middleware/auth.js');
const upload = require("../middleware/upload");
const AuthorizationRouter = express.Router();

AuthorizationRouter.post('/Register',registerUser);
AuthorizationRouter.post('/login',login);
AuthorizationRouter.put('/update',authmiddleware,updataeuser);


//  Profile Imgage Routes
AuthorizationRouter.post(
  "/upload-profile",
  authmiddleware,
  upload.single("image"),
  uploadProfileImage
);

AuthorizationRouter.get(
  "/profile",
  authmiddleware,
  getProfile
);

module.exports = AuthorizationRouter;
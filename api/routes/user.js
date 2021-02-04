'use strict'
const express = require('express');
const UserController = require('../controllers/user');
const Authenticated = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const api = express.Router();
const userController = new UserController();
const md_authenticated = new Authenticated();
const md_upload = multipart({uploadDir: './uploads/users'});

api.post('/register', userController.saveUser);
api.post('/login', userController.login);
api.put('/update-user/:id', md_authenticated.ensureAuth, userController.updateUser);
api.post('/upload-user-image/:id', [md_authenticated.ensureAuth, md_upload], userController.uploadImage);
api.get('/get-user-image/:imageFile', userController.getImageFile);

module.exports = api;
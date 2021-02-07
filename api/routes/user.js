const express = require('express');
const UserController = require('../controllers/user');
const Authenticated = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const api = express.Router();
const userController = new UserController();
const md_authenticated = new Authenticated();
const md_upload = multipart({uploadDir: './uploads/users'});

api.post('/register', (req, res) => {
    userController.saveUser(req, res);
});
api.post('/login', (req, res) => {
    userController.login(req, res)
});
api.put('/update-user/:id', md_authenticated.ensureAuth, (req, res) => {
    userController.updateUser(req, res);
});
api.post('/upload-user-image/:id', [md_authenticated.ensureAuth, md_upload], (req, res) => {
    userController.uploadImage(req, res);
});
api.get('/get-user-image/:imageFile', (req, res) => {
    userController.getImageFile(req, res);
});

module.exports = api;
const express = require('express');
const AlbumController = require('../controllers/album');
const Authenticated = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const albumController = new AlbumController();
const md_authenticated = new Authenticated();
const api = express.Router();
const md_upload = multipart({uploadDir: './uploads/albums'});

api.get('/album/:id', md_authenticated.ensureAuth, (req, res) => {
    albumController.getAlbum(req, res);
});
api.get('/albums/:id?', md_authenticated.ensureAuth, (req, res) => {
    albumController.getAlbums(req, res);
});
api.post('/album', md_authenticated.ensureAuth, (req, res) => {
    albumController.saveAlbum(req, res);
});
api.put('/album/:id', md_authenticated.ensureAuth, (req, res) => {
    albumController.updateAlbum(req, res);
});
api.delete('/album/:id', md_authenticated.ensureAuth, (req, res) => {
    albumController.deleteAlbum(req, res);
});
api.post('/upload-album-image/:id', [md_authenticated.ensureAuth, md_upload], (req, res) => {
    albumController.uploadImage(req, res);
});
api.get('/get-album-image/:imageFile', [md_authenticated.ensureAuth, md_upload], (req, res) => {
    albumController.getImageFile(req, res);
});


module.exports = api;
'use strict'
const express = require('express');
const AlbumController = require('../controllers/album');
const Authenticated = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const albumController = new AlbumController();
const md_authenticated = new Authenticated();
const api = express.Router();
const md_upload = multipart({uploadDir: './uploads/albums'});

api.get('/album/:id', md_authenticated.ensureAuth, albumController.getAlbum);
api.get('/albums/:id?', md_authenticated.ensureAuth, albumController.getAlbums);
api.post('/album', md_authenticated.ensureAuth, albumController.saveAlbum);
api.put('/album/:id', md_authenticated.ensureAuth, albumController.updateAlbum);
api.delete('/album/:id', md_authenticated.ensureAuth, albumController.deleteAlbum);
api.post('/upload-album-image/:id', [md_authenticated.ensureAuth, md_upload], albumController.uploadImage);
api.get('/get-album-image/:imageFile', [md_authenticated.ensureAuth, md_upload], albumController.getImageFile);


module.exports = api;
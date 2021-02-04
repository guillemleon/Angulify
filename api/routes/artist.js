'use strict'
const express = require('express');
const ArtistController = require('../controllers/artist');
const Authenticated = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const artistController = new ArtistController();
const md_authenticated = new Authenticated();
const api = express.Router();
const md_upload = multipart({uploadDir: './uploads/artists'});

api.get('/artist/:id', md_authenticated.ensureAuth, artistController.getArtist);
api.post('/artist', md_authenticated.ensureAuth, artistController.saveArtist);
api.get('/artists/:page', md_authenticated.ensureAuth, artistController.getArtists);
api.put('/artist/:id', md_authenticated.ensureAuth, artistController.updateArtist);
api.delete('/artist/:id', md_authenticated.ensureAuth, artistController.deleteArtist);
api.post('/upload-artist-image/:id', [md_authenticated.ensureAuth, md_upload], artistController.uploadImage);
api.get('/get-artist-image/:imageFile', [md_authenticated.ensureAuth, md_upload], artistController.getImageFile);



module.exports = api;
const express = require('express');
const ArtistController = require('../controllers/artist');
const Authenticated = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const artistController = new ArtistController();
const md_authenticated = new Authenticated();
const api = express.Router();
const md_upload = multipart({uploadDir: './uploads/artists'});

api.get('/artist/:id', md_authenticated.ensureAuth, (req, res) => {
    artistController.getArtist(req, res);
});
api.post('/artist', md_authenticated.ensureAuth, (req, res) => {
    artistController.saveArtist(req, res);
});
api.get('/artists/:page', md_authenticated.ensureAuth, (req, res) => {
    artistController.getArtists(req, res);
});
api.get('/artists-list', md_authenticated.ensureAuth, (req, res) => {
    artistController.getAllArtists(req, res);
});
api.put('/artist/:id', md_authenticated.ensureAuth, (req, res) => {
    artistController.updateArtist(req, res);
});
api.delete('/artist/:id', md_authenticated.ensureAuth, (req, res) => {
    artistController.deleteArtist(req, res);
});
api.post('/upload-artist-image/:id', [md_authenticated.ensureAuth, md_upload], (req, res) => {
    artistController.uploadImage(req, res);
});
api.get('/get-artist-image/:imageFile', [md_authenticated.ensureAuth, md_upload], (req, res) => {
    artistController.getImageFile(req, res);
});



module.exports = api;
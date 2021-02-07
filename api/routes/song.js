const express = require('express');
const SongController = require('../controllers/song');
const Authenticated = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const songController = new SongController();
const md_authenticated = new Authenticated();
const api = express.Router();
const md_upload = multipart({uploadDir: './uploads/songs'});

api.get('/song/:id', md_authenticated.ensureAuth, (req, res) => {
    songController.getSong(req, res);
});
api.post('/song', md_authenticated.ensureAuth, (req, res) => {
    songController.saveSong(req, res);
});
api.get('/songs/:id?', md_authenticated.ensureAuth, (req, res) => {
    songController.getSongs(req, res);
});
api.get('/songs-list', md_authenticated.ensureAuth, (req, res) => {
    songController.getAllSongs(req, res);
});
api.put('/song/:id', md_authenticated.ensureAuth, (req, res) => {
    songController.updateSong(req, res);
});
api.delete('/song/:id', md_authenticated.ensureAuth, (req, res) => {
    songController.deleteSong(req, res);
});
api.post('/upload-song-file/:id', [md_authenticated.ensureAuth, md_upload], (req, res) => {
    songController.uploadFile(req, res);
});
api.get('/get-song-file/:songFile', (req, res) => {
    songController.getSongFile(req, res);
});


module.exports = api;
'use strict'
const express = require('express');
const SongController = require('../controllers/song');
const Authenticated = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const songController = new SongController();
const md_authenticated = new Authenticated();
const api = express.Router();
const md_upload = multipart({uploadDir: './uploads/songs'});

api.get('/song/:id', md_authenticated.ensureAuth, songController.getSong);
api.post('/song', md_authenticated.ensureAuth, songController.saveSong);
api.get('/songs/:id?', md_authenticated.ensureAuth, songController.getSongs);
api.put('/song/:id', md_authenticated.ensureAuth, songController.updateSong);
api.delete('/song/:id', md_authenticated.ensureAuth, songController.deleteSong);
api.post('/upload-song-file/:id', [md_authenticated.ensureAuth, md_upload], songController.uploadFile);
api.get('/get-song-file/:songFile', md_authenticated.ensureAuth, songController.getSongFile);


module.exports = api;
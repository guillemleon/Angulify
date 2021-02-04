'use strict'
const fs = require('fs');
const path = require('path');
const mongoosePaginate = require('mongoose-pagination');

const AlbumModel = require('../models/album');
const SongModel = require('../models/song');

class Song {

    constructor() {}

    getSong(req, res) {
        const songId = req.params.id;
        
        SongModel.findById(songId).populate({path: 'album'}).exec((err, song) =>  {
            if(err) {
                res.status(500).send({message: 'Request failed'})
            } else {
                if(!song) {
                    res.status(404).send({message: 'Song wasn\'t found'});
                } else {
                    res.status(200).send({song})
                }
            }
        });
    }

    getSongs(req, res) {
        const albumId = req.params.id;
        let find;

        if(!albumId) {
            find = SongModel.find({}).sort('number');
        } else {
            find = SongModel.find({album: albumId}).sort('number');
        }

        find.populate({
            path: 'album',
            populate: {
                path: 'artist',
                model: 'Artist'
            }
        }).exec((err, songs) => {
            if(err) {
                res.status(500).send({message: 'Request failed'})
            } else {
                if(!songs) {
                    res.status(404).send({message: 'No songs found'});
                } else {
                    res.status(200).send({songs})
                }
            }
        })
    }

    saveSong(req, res) {
        const song = new SongModel();
        const params = req.body;

        song.number = params.number;
        song.name = params.name;
        song.duration = params.duration;
        song.file = null;
        song.album = params.album;

        song.save((err, songStored) => {
            if(err) {
                res.status(500).send({message: 'Request failed'})
            } else {
                if(!songStored) {
                    res.status(404).send({message: 'Song wasn\'t uploaded'});
                } else {
                    res.status(200).send({song: songStored})
                }
            }
        })
    }

    updateSong(req, res) {
        const songId = req.params.id;
        const update = req.body;

        SongModel.findByIdAndUpdate(songId, update, (err, songUpdated) => {
            if(err) {
                res.status(500).send({message: 'Request failed'})
            } else {
                if(!songUpdated) {
                    res.status(404).send({message: 'No song updated'});
                } else {
                    res.status(200).send({songUpdated})
                }
            }
        })
    }

    deleteSong(req, res) {
        const songId = req.params.id;
        SongModel.findByIdAndRemove(songId, (err, songRemoved) => {
            if(err) {
                res.status(500).send({message: 'Request failed.'});
            } else {
                if(!songRemoved) {
                    res.status(404).send({message: 'No song removed'});
                } else {
                    res.status(404).send({song: songRemoved});
                }
            }
        })
    }

    uploadFile(req, res) {
        const songId = req.params.id;
        let file_name = 'Didn\'t uploaded';
        let file_extension;

        console.log(req.files);

        if(req.files) {
            let file_path = req.files.file.path;
            let file = file_path.split('\\');
            file_name = file[2];
            file_extension = file_name.split('\.')[1];

            if(file_extension === 'mp3') {
                SongModel.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdated) => {
                    if(!songUpdated) {
                        res.status(404).send({message: 'Could not update song.'})
                    } else {
                        res.status(200).send({song: songUpdated});
                    }
                })
            } else {
                res.status(200).send({message: 'Invalid file extension.'});
            }

        } else {
            res.status(200).send({message: 'You haven\'t uploaded any file.'});
        }
    }
    
    getSongFile(req, res) {
        let songFile = req.params.songFile;
        let filePath = './uploads/songs/' + songFile;
        fs.exists(filePath, (exists) => {
            if(exists) {
                res.sendFile(path.resolve(filePath))
            } else {
                res.status(200).send({message: 'Song file doesn\'t exists'});
            }
        })

    }

}

module.exports = Song;
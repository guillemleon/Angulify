'use strict'
const fs = require('fs');
const path = require('path');
const mongoosePaginate = require('mongoose-pagination');

const AlbumModel = require('../models/album');
const SongModel = require('../models/song');

class Album {

    constructor() {}

    getAlbum(req, res) {
        const albumId = req.params.id;
        
        AlbumModel.findById(albumId).populate({path: 'artist'}).exec((err, album) =>  {
            if(err) {
                res.status(500).send({message: 'Request failed'})
            } else {
                if(!album) {
                    res.status(404).send({message: 'Album wasn\'t found'});
                } else {
                    res.status(200).send({album})
                }
            }
        });
    }

    getAlbums(req, res) {
        const artistId = req.params.id;
        let find;

        if(!artistId) {
            find = AlbumModel.find({}).sort('title');
        } else {
            find = AlbumModel.find({artist: artistId}).sort('year');
        }

        find.populate({path: 'artist'}).exec((err, albums) => {
            if(err) {
                res.status(500).send({message: 'Request failed'})
            } else {
                if(!albums) {
                    res.status(404).send({message: 'No albums found'});
                } else {
                    res.status(200).send({albums})
                }
            }
        })
    }

    saveAlbum(req, res) {
        const album = new AlbumModel();

        const params = req.body;
        album.title = params.title;
        album.description = params.description;
        album.year = params.year;
        album.image = 'null';
        album.artist = params.artist;

        album.save(album, (err, albumStored) => {
            if(err) {
                res.status(500).send({message: 'Request failed'})
            } else {
                if(!albumStored) {
                    res.status(404).send({message: 'Album wasn\'t saved'});
                } else {
                    res.status(200).send({album: albumStored})
                }
            }
        })
    }

    updateAlbum(req, res) {
        const albumId = req.params.id;
        const update = req.body;

        AlbumModel.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
            if(err) {
                res.status(500).send({message: 'Request failed'})
            } else {
                if(!albumUpdated) {
                    res.status(404).send({message: 'No album updated'});
                } else {
                    res.status(200).send({albumUpdated})
                }
            }
        })
    }

    deleteAlbum(req, res) {
        const albumId = req.params.id;
        AlbumModel.findByIdAndRemove(albumId, (err, albumRemoved) => {
            if(err) {
                res.status(500).send({message: 'Request failed.'});
            } else {
                if(!albumRemoved) {
                    res.status(404).send({message: 'No album removed'});
                } else {
                    // DELETE ALL SONGS RELATED TO THE ALBUM
                    SongModel.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                        if(err) {
                            res.status(500).send({message: 'Request failed.'});
                        } else {
                            if(!songRemoved) {
                                res.status(404).send({message: 'No song removed'});
                            } else {
                                res.status(404).send({album: albumRemoved});
                            }
                        }
                    })
                }
            }
        })
    }

    uploadImage(req, res) {
        const albumId = req.params.id;
        let file_name = 'Didn\'t uploaded';
        let file_extension;

        console.log(req.files);

        if(req.files) {
            let file_path = req.files.image.path;
            let file = file_path.split('\\');
            file_name = file[2];
            file_extension = file_name.split('\.')[1];

            if(file_extension === 'jpg' || file_extension === 'gif' || file_extension === 'png') {
                AlbumModel.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
                    if(!albumUpdated) {
                        console.log(err);
                        res.status(404).send({message: 'Could not update album.'})
                    } else {
                        res.status(200).send({album: albumUpdated});
                    }
                })
            } else {
                res.status(200).send({message: 'Invalid file extension.'});
            }

        } else {
            res.status(200).send({message: 'You haven\'t uploaded any image.'});
        }
    }
    
    getImageFile(req, res) {

        let imageFile = req.params.imageFile;
        let filePath = './uploads/albums/' + imageFile;
        fs.exists(filePath, (exists) => {
            if(exists) {
                res.sendFile(path.resolve(filePath))
            } else {
                res.status(200).send({message: 'Image doesn\'t exists'});
            }
        })

    }

}

module.exports = Album;
'use strict'
const fs = require('fs');
const path = require('path');
const mongoosePaginate = require('mongoose-pagination');

const ArtistModel = require('../models/artist');
const AlbumModel = require('../models/album');
const SongModel = require('../models/song');

class Artist {

    constructor() {}

    getArtist(req, res) {
        const artistId = req.params.id;
        
        ArtistModel.findById(artistId, (err, artist) => {
            if(err) {
                res.status(500).send({message: 'Request failed'})
            } else {
                if(!artist) {
                    res.status(404).send({message: 'Artist wasn\'t found'});
                } else {
                    res.status(200).send({artist})
                }
            }
        });
    }

    getArtists(req, res) {
        const page = req.params.page ? req.params.page : 1;
        const itemsEachPage = 3;

        ArtistModel.find().sort('name').paginate(page, itemsEachPage, (err, artists, totalItems) => {
            if(err) {
                res.status(500).send({message: 'Request failed.'});
            } else {
                if(!artists) {
                    res.status(404).send({message: 'No artists found.'});
                } else {
                    return res.status(200).send({
                        pages: totalItems,
                        artists: artists
                    })
                }
            }
        })
    }

    updateArtist(req, res) {
        const artistId = req.params.id;
        const update = req.body;

        ArtistModel.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
            if(err) {
                res.status(500).send({message: 'Request failed.'});
            } else {
                if(!artistUpdated) {
                    res.status(404).send({message: 'No artists updated.'});
                } else {
                    res.status(200).send({artist: artistUpdated});
                }
            }
        })
    }

    deleteArtist(req, res) {
        const artistId = req.params.id;

        ArtistModel.findByIdAndRemove(artistId, (err, artistRemoved) => {
            if(err) {
                res.status(500).send({message: 'Request failed.'});
            } else {
                if(!artistRemoved) {
                    res.status(404).send({message: 'No artist removed'});
                } else {
                    // REMOVE ALL SONGS RELATED TO THE ARTIST
                    AlbumModel.find({artist: artistRemoved._id}).remove((err, albumRemoved) => {
                        if(err) {
                            res.status(500).send({message: 'Request failed.'});
                        } else {
                            if(!albumRemoved) {
                                res.status(404).send({message: 'No album removed'});
                            } else {
                                // DELETE ALL SONGS RELATED TO THE ARTIST
                                SongModel.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                                    if(err) {
                                        res.status(500).send({message: 'Request failed.'});
                                    } else {
                                        if(!songRemoved) {
                                            res.status(404).send({message: 'No song removed'});
                                        } else {
                                            res.status(404).send({artist: artistRemoved});
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    uploadImage(req, res) {
        const artistId = req.params.id;
        let file_name = 'Didn\'t uploaded';
        let file_extension;

        console.log(req.files);

        if(req.files) {
            let file_path = req.files.image.path;
            let file = file_path.split('\\');
            file_name = file[2];
            file_extension = file_name.split('\.')[1];

            if(file_extension === 'jpg' || file_extension === 'gif' || file_extension === 'png') {
                ArtistModel.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdated) => {
                    if(!artistUpdated) {
                        console.log(err);
                        res.status(404).send({message: 'Could not update artist.'})
                    } else {
                        res.status(200).send({artist: artistUpdated});
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
        let filePath = './uploads/artists/' + imageFile;
        fs.exists(filePath, (exists) => {
            if(exists) {
                res.sendFile(path.resolve(filePath))
            } else {
                res.status(200).send({message: 'Image doesn\'t exists'});
            }
        })

    }

    saveArtist(req, res) {
        let artist = new ArtistModel();

        const params = req.body;

        artist.name = params.name;
        artist.description = params.description;
        artist.image = 'null';

        artist.save((err, artistStored) => {
            if(err) {
                res.status(500).send({message: 'Failed saving artist.'});
            } else {
                if(!artistStored) {
                    res.status(404).send({message: 'Artist was not saved.'});
                } else {
                    res.status(200).send({artist: artistStored});
                }
            }
        })
    }

}

module.exports = Artist;
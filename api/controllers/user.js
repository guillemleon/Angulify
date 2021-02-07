const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');

const JwtService = require('../services/jwt');
const jwt = new JwtService();

class UserController {

    constructor() {}

    // REGISTER USER
    saveUser(req, res) {
        const user = new User();

        const params = req.body;
        console.log(params);

        user.name = params.name;
        user.lastName = params.lastName;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = 'null';

        if(params.password) {
            // PASSWORD CRYPTING AND SAVING DATA
            bcrypt.hash(params.password, null, null, (err, hash) => {
                user.password = hash;
                if(user.name !== null && user.lastName !== null && user.email !== null) {
                    // SAVE USER INTO DATABASE
                    user.save((err, userStored) => {
                        if(err) {
                            res.status(500).send({message: 'Unable to save user'});
                        } else {
                            if(!userStored) {
                                res.status(404).send({message: 'The user was not registered'});
                            } else {
                                res.status(200).send({user: userStored});
                            }
                        }
                    });
                } else {
                    res.status(200).send({message: 'Fill empty fields'});
                }
            })
        } else {
            res.status(500).send({message: 'Enter password'});
        }

    }

    // LOGIN
    login(req, res) {
        const params = req.body;
        console.log(params);
        const email = params.email;
        const password = params.password;

        User.findOne({email: email.toLowerCase()}, (err, user) => {
            if(err) {
                res.status(500).send({message: 'Error on call'})
            } else {
                if(!user) {
                    res.status(404).send({message: 'User doesn\'t exist'});
                } else {
                    bcrypt.compare(password, user.password, (err, check) => {
                        if(check) {
                            // GET BACK LOGGED USER DATA
                            if(params.getHash) {
                                // GET BACK JWT TOKEN
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            } else {
                                res.status(200).send({user});
                            }
                        } else {
                            res.status(404).send({message: 'Unable to login'});
                        }
                    });
                }
            }
        })
    }

    updateUser(req, res) {
        const userId = req.params.id;
        const update = req.body;

        User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
            if(err) {
                res.status(500).send({message: 'User update failed.'});
            } else {
                if(!userUpdated) {
                    res.status(404).send({message: 'Could not update user.'})
                } else {
                    res.status(200).send({user: userUpdated});
                }
            }
        });
    }

    uploadImage(req, res) {
        const userId = req.params.id;
        let file_name = 'Didn\'t uploaded';
        let file_extension;

        console.log(req.files);

        if(req.files) {
            let file_path = req.files.image.path;
            let file = file_path.split('\\');
            file_name = file[2];
            file_extension = file_name.split('\.')[1];

            if(file_extension === 'jpg' || file_extension === 'gif' || file_extension === 'png') {
                User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                    if(!userUpdated) {
                        console.log(err);
                        res.status(404).send({message: 'Could not update user.'})
                    } else {
                        res.status(200).send({image: file_name, user: userUpdated});
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
        let filePath = './uploads/users/' + imageFile;
        fs.exists(filePath, (exists) => {
            if(exists) {
                res.sendFile(path.resolve(filePath))
            } else {
                res.status(200).send({message: 'Image doesn\'t exists'});
            }
        })

    }

}

module.exports = UserController;
'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'secret';

class Authenticated {

    constructor() {
        
    }

    ensureAuth(req, res, next) {
        
        if(!req.headers.authorization) {
            return res.status(403).send({message: 'Request has no authentication header'})
        }

        let token = req.headers.authorization.replace(/['"]+/g, '');

        try {
            var payload = jwt.decode(token, secret);

            if(payload.ex <= moment().unix()) {
                console.log('Error: ' + err);
                return res.status(401).send({message: 'Token has expired'});
            }
        } catch(err) {
            console.log('Error: ' + err);
            return res.status(404).send({message: 'Invalid token'});
        }

        req.user = payload;

        next();

    }

}

module.exports = Authenticated;
'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');

class JwtService {

    constructor() {
        this.secret = 'secret';
    }

    createToken(user) {
        const payload = {
            sub: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            image: user.image,
            iat: moment().unix(),
            exp: moment().add(30, 'days').unix
        };

        return jwt.encode(payload, this.secret);
    }

}

module.exports = JwtService;
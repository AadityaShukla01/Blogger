const jwt = require('jsonwebtoken');
const { HTTPError } = require('../models/errorModel');

const authMiddleware = async (req, res, next) => {
    const Authorization = req.headers.authorization || req.headers.Authorization

    if (Authorization && Authorization.startsWith("Bearer")) {
        const token = Authorization.split(' ')[1];
        //Bearer fjsppo[[paospo]]

        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if (err) {
                return next(new HTTPError('Unauthorised user..Invalid token', 403))
            }

            req.user = info;
            next();
        })
    }
    else {
        return next(new HTTPError('Unauthorised user..No token', 402))
    }
}

module.exports = authMiddleware;
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return next(createError.Unauthorized());

    const token = authHeader.split(' ')[1];
    if (!token) return next(createError.Unauthorized());

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized());
        }
        req.payload = payload;
        next();
    });
};

module.exports = verifyAccessToken;

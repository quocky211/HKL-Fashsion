const JWT = require('jsonwebtoken');
const httpError = require('http-errors');
const client = require('../helpers/connection_redis');
const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId,
        };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '24h',
        };

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId,
        };
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '1y',
        };

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            client.set(userId.toString(), token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                if (err) return reject(httpError.InternalServerError());

                resolve(token);
            });
        });
    });
};

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(httpError.Unauthorized());
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    // start verify token
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(httpError.Unauthorized());
            }
            return next(httpError.Unauthorized(err.message));
        }

        req.payload = payload;
        next();
    });
};

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) return reject(err);
            client.get(payload.userId, (err, reply) => {
                if (err) return reject(httpError.InternalServerError());

                if (refreshToken === reply) return resolve(payload);

                return reject(httpError.Unauthorized());
            });
        });
    });
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};

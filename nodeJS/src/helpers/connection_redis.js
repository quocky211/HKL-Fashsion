const redis = require('redis');

let client;
if (process.env.REDIS_ENDPOINT_URI) {
    client = redis.createClient({
        url: process.env.REDIS_ENDPOINT_URI,
        socket: {
            tls: true,
            rejectUnauthorized: false
          }
    });
} else {
    client = redis.createClient({
        port: 6379,
        host: '127.0.0.1',
    });
}

client.ping((err, pong) => {
    console.log(pong);
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.on('connect', (err) => console.log('Redis Client connected'));

client.on('ready', (err) => console.log('Redis Client ready'));

module.exports = client;

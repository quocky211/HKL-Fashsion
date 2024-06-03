const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const route = require('./src/routes');
const db = require('./src/config/db');
const app = express();
const cors = require('cors');

const path = require('path');
require('dotenv').config();
require('./src/helpers/connection_redis');

// morgan: bắn ra log khi gửi yêu cầu lên server
app.use(morgan('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(bodyParser.json());
app.use(express.json());

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const buildPath = path.join(__dirname, 'reactJS', 'build');
const cacheOptions = {
    maxAge: '1h',
};

app.use(express.static(buildPath, cacheOptions));

db.connect();

app.use((req, res, next) => {
    next();
});

route(app);

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});

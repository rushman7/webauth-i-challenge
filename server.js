const express = require('express');
const logger = require('./api/logger');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user-route');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/api', logger(), userRouter);

module.exports = server;
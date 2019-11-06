const express = require('express');
const logger = require('./api/logger');
const bodyParser = require('body-parser');

// const projectRouter = require('./routes/projects-router');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// server.use('/api/projects', logger(), projectRouter);

module.exports = server;
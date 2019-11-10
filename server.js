const express = require('express');
const logger = require('./api/logger');
const bodyParser = require('body-parser');
const session = require('express-session');

const userRouter = require('./routes/user-route');

const sessionConfig = {
  name: 'monkey', // sid
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
}

const server = express();
server.use(session(sessionConfig))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/api', logger(), userRouter);

module.exports = server;
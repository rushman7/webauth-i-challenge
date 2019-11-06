const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/helpers/userModel');
// const validate = require('../api/validate');

const router = express.Router();

router.get('/users', (req, res) => {
  db.getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err))
})

router.post('/register', (req, res) => {
  let credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);

  credentials.password = hash;

  db.add(credentials)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err))
})

module.exports = router;
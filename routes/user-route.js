const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/helpers/userModel');
const validate = require('../api/validate');

const router = express.Router();

router.get('/users', (req, res) => {
  db.getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err))
})

router.post('/register', validate.validateCredentialBody, (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);

  credentials.password = hash;

  db.add(credentials)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err))
})

router.post('/login', validate.validateCredentialBody, (req, res) => {
  const { username, password } = req.body;

  db.getUsers({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) res.status(201).json({ message: `Welcome ${user.username}!` })
      else res.status(401).json({ error: `Invalid credentials.` })
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;
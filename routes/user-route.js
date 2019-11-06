const express = require('express');

const db = require('../data/helpers/userModel');
// const validate = require('../api/validate');

const router = express.Router();

router.get('/', (req, res) => {
  db.getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err))
})

module.exports = router;
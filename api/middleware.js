module.exports = { 
  validateCredentialBody, 
  restricted 
};

const db = require('../data/helpers/userModel');
const bcrypt = require('bcryptjs');

function validateCredentialBody(req, res, next) {
  const { username, password } = req.body;

  if (!req.body) res.status(400).json({ message: "Missing multiple BODY inputs." })
  else if (!username || !password) res.status(400).json({ message: "Missing username or password." })
  else next();
}

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    db.getUsers({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) next();
        else res.status(401).json({ error: `Invalid credentials.` })
      })
      .catch(err => res.status(500).json(err))
  } else res.status(401).json({ message: 'Please provide valid credentials.' })
}
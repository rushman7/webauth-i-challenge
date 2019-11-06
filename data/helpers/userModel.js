const db = require('../dbConfig');

module.exports = { getUsers, add }

function getUsers(id) {
  let query = db('users as u');

  if (id) query.where('u.id', id).first();

  return query.select('u.id', 'u.username', 'u.password');
};

function add(user) {
  return db('users').insert(user)
}

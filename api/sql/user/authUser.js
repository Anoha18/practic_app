const { pool } = require('../db');

const userKeys = [
  'user_id as id',
  'name',
  'lastname',
  'password',
  'email',
  'phone',
  'deleted',
  'created_at',
  'updated_at'
];

module.exports = async({ login, password }) => {
  if (!login || !password) { return { error: 'Not found login or password' }; }
  const query = `select ${userKeys.join(',')} from users where login = ${login} and password = ${password}`;

  try {
    const { rows } = await pool.query(query);
    if (!rows || !rows.length) { return { user: null }; }

    const user = rows[0];

    return { user };
  } catch (error) {
    return { error };
  }
};

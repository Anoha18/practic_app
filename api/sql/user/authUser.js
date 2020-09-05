const { pool } = require('../../db');

const userKeys = [
  'user_id as id',
  'user_id',
  'login',
  'name',
  'lastname',
  'email',
  'phone',
  'deleted',
  'created_at',
  'updated_at'
];

module.exports = async({ login, password }) => {
  if (!login || !password) { return { error: 'Not found login or password' }; }
  const query = `
    select ${userKeys.join(',')} from users
    where login = '${login}' 
    and password = crypt('${password}', password)
    and deleted = false
  `;

  try {
    const { rows } = await pool.query(query);
    if (!rows || !rows.length) { return { user: null }; }

    const user = rows[0];

    return { user };
  } catch (error) {
    return { error };
  }
};

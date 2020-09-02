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

module.exports = async(userId) => {
  if (!userId) { return { error: 'User id not found' }; }
  const query = `select ${userKeys.join(',')} from users where user_id = ${userId}`;

  try {
    const { rows } = await pool.query(query);
    if (!rows || !rows.length) { return { error: `User by id ${userId} not found` }; }

    const user = rows[0];

    return { user };
  } catch (error) {
    return { error };
  }
};
const { pool } = require('../../db');

module.exports = async({ name, lastname, password, email, phone, login }) => {
  if (!login || !password) return { error: 'Not found password or login' };

  const query = `
    insert into users (name, lastname, password, email, phone, login)
    values ($1, $2, crypt($3, gen_salt('bf', 8)), $4, $5, $6) returning *
  `;

  try {
    const { rows } = await pool.query(query, [
      name || null, lastname || null, password, email || null, phone || null, login
    ]);

    return {
      user: (rows && rows[0]) || null
    };
  } catch (error) {
    return { error: error.message };
  }
};

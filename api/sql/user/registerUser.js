const { pool } = require('../../db');

module.exports = async({ name, lastname, password, email, phone, login }) => {
  if (!login || !password) return { error: 'Not found password or login' };

  const query = `
    insert into users (name, lastname, password, email, phone, login)
    values (?, ?, crypt(?, gen_salt('bf', 8)), ?, ?, ?) returning *
  `;

  try {
    const result = await pool.query(query, [
      name || null, lastname || null, password, email || null, phone || null, login
    ]);

    return {
      result
    };
  } catch (error) {
    return { error: error.message };
  }
};

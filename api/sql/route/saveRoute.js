const { pool } = require('../../db');

module.exports = async(route) => {
  const query = `
    insert into routes (${Object.keys(route).join(', ')})
    values(${Object.keys(route).map((key, index) => '$' + (index + 1))})
    returning *
  `;

  try {
    const { rows } = await pool.query(query, Object.keys(route).map(key => route[key] || null));

    return { route: (rows && rows[0]) || null };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

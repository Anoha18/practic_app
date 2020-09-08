const { pool } = require('../../db');

module.exports = async(address) => {
  const query = `
    insert into addresses (${Object.keys(address).join(', ')})
    values(${Object.keys(address).map((key, index) => '$' + (index + 1))})
    returning *
  `;

  try {
    const { rows } = await pool.query(query, Object.keys(address).map(key => address[key] || null));

    return { address: (rows && rows[0]) || null };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

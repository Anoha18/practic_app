const { pool } = require('../../db');

module.exports = async({ id, column, value }) => {
  const query = `
    update refresh_tokens set 
      ${column} = $1,
      updated_at = now()
    where refresh_token_id = ${id}
    returning *
  `;

  try {
    const { rows } = await pool.query(query, [value]);
    return { refreshToken: (rows && rows[0]) || null };
  } catch (error) {
    console.error(error);
    return { error: error.messsage };
  }
};

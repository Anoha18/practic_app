const { pool } = require('../../db');

module.exports = async({ userId, refreshToken, ip, parentId }) => {
  if (!userId) { return { error: 'User id not found' }; }

  const query = ` insert into refresh_tokens(user_id, refresh_token, ip, parent_id)
    values ($1, $2, $3, $4)
    returning *
  `;

  try {
    const { rows } = await pool.query(query, [userId, refreshToken, ip, parentId]);

    return { refreshTokenInfo: (rows && rows[0]) || null };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

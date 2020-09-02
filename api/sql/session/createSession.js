const { pool } = require('../../db');

module.exports = async({ user_id, token, ip }) => {
  if (!user_id) { return { error: 'User id not found' }; }

  const query = ` insert into sessions(user_id, token, ip)
    values (${user_id}, ${token}, ${ip})
  `;

  try {
    const result = await pool.query(query);

    return { result };
  } catch (error) {
    return { error };
  }
};

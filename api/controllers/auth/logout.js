const { pool } = require('../../db');

const closeRefreshTokens = async({ userId, ip }) => {
  try {
    await pool.query('update refresh_tokens set closed = true where user_id = $1 and ip = $2', [userId, ip]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = async(req, res) => {
  const { clientIp, user } = req;
  await closeRefreshTokens({
    userId: user.id,
    ip: clientIp
  });

  res.json({ result: 'success' });
};

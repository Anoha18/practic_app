const { user: { registerUser } } = require('../../sql');
const { pool } = require('../../db');

const isLogin = async(login) => {
  try {
    const { rows } = await pool.query(`
      select u.user_id
      from users u
      where u.deleted = false
      and u.login = ${login}
    `);
    return { rows };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

module.exports = async(req, res) => {
  const { body } = req;
  if (!body.login) { return res.json({ error: 'Login not found' }); }
  if (!body.password) { return res.json({ error: 'Password not found' }); }

  const { rows, error: isLoginError } = await isLogin(body.login);
  if (isLoginError) { return res.json({ error: 'Server error: ' + isLoginError }); }
  if (rows.length) { return res.json({ error: 'Login already exists' }); }
};

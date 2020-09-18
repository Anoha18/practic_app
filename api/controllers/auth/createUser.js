const { user: { registerUser } } = require('../../sql');
const { pool } = require('../../db');

const isLogin = async(login) => {
  try {
    const { rows } = await pool.query(`
      select u.user_id
      from users u
      where u.deleted = false
      and u.login = '${login}'
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
  if (!body.name) { return res.json({ error: 'Name not found' }); }

  const { rows, error: isLoginError } = await isLogin(body.login);
  if (isLoginError) { return res.json({ error: 'Server error: ' + isLoginError }); }
  if (rows.length) { return res.json({ error: 'Login already exists' }); }

  const { user, error } = await registerUser({
    name: body.name,
    lastname: body.lastname || null,
    login: body.login,
    password: body.password
  });

  if (error) {
    return res.json({ error });
  }

  res.json({ result: user.user_id });
};

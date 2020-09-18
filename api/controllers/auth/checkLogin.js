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
  const { query } = req;
  const { login } = query;
  if (!login) return res.status(400).json({ erorr: 'Not found login' });

  const { rows, error } = await isLogin(login);

  if (error) {
    return res.json({ error });
  }

  res.json({ result: !!rows.length });
};

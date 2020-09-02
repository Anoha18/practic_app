const passport = require('passport');
const jwt = require('jsonwebtoken');
const { session } = require('../../sql');
const jwtSecret = process.env.JWT_SECRET;

const generateJWT = payload => jwt
  .sign(payload, jwtSecret, { expiresIn: 60 * 60 });

module.exports = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (error, user, info) => {
    console.log('LOCAL AUTH ERROR: ', error);
    console.log('LOCAL AUTH INFO: ', info);

    if (error) { return res.json({ error }); }

    if (!user) { return res.json({ info: info || 'Логин или пароль неверный' }); }

    const payload = {
      user_id: user.user_id,
      login: user.login,
      name: user.name,
      lastname: user.lastname
    };
    const access_token = generateJWT(payload);

    // const ip = req.connection.remoteAddress;
    // TODO Добавить в методе добавления сессии проверку на существуюшие ip
    // const { error: createSessionError } = await session.createSession({ user_id: user.user_id, ip, token: access_token });

    // if (createSessionError) { console.error('CREATE SESSION ERROR: ', createSessionError); }

    res.json({ ...user, ...{ access_token } });
  })(req, res, next);
};

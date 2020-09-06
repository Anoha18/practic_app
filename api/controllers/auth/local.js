const passport = require('passport');
const jwt = require('jsonwebtoken');
const { refreshToken } = require('../../sql');
const accessJwtSecret = process.env.ACCESS_JWT_SECRET;
const refreshJwtSecret = process.env.REFRESH_JWT_SECRET;
const expiresInRefreshToken = process.env.REFRESH_JWT_LIFE;
const expiresInAccessToken = process.env.ACCESS_JWT_LIFE;

const generateAccessJWT = payload => jwt
  .sign(payload, accessJwtSecret, { expiresIn: expiresInAccessToken });

const generateRefreshJWT = payload => jwt
  .sign(payload, refreshJwtSecret, { expiresIn: expiresInRefreshToken });

module.exports = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (error, user, info) => {
    console.log('LOCAL AUTH ERROR: ', error);
    console.log('LOCAL AUTH INFO: ', info);

    if (error) { return res.json({ error }); }

    if (!user) { return res.json({ info: info || 'Логин или пароль неверный' }); }

    const payload = { user_id: user.user_id };
    const access_token = generateAccessJWT(payload);
    const refresh_token = generateRefreshJWT(payload);
    const { clientIp } = req;

    // const { error: createSessionError } = await session.createSession({ user_id: user.user_id, ip: clientIp, token: access_token });

    // if (createSessionError) { console.error('CREATE SESSION ERROR: ', createSessionError); }

    res.cookie('access_token', access_token);
    res.cookie('refresh_token', refresh_token);
    res.status(200).json({user: { ...user, ...{ access_token }, ...{ refresh_token } }});
  })(req, res, next);
};

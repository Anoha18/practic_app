const passport = require('passport');
const jwt = require('jsonwebtoken');
const { refreshToken: { saveRefreshToken } } = require('../../sql');
const {
  JWT: {
    ACCESS_JWT_LIFE,
    REFRESH_JWT_LIFE,
    ACCESS_JWT_SECRET,
    REFRESH_JWT_SECRET
  }
} = require('../../../config');

const generateAccessJWT = payload => jwt
  .sign(payload, ACCESS_JWT_SECRET, { expiresIn: ACCESS_JWT_LIFE || '1h' });

const generateRefreshJWT = payload => jwt
  .sign(payload, REFRESH_JWT_SECRET, { expiresIn: REFRESH_JWT_LIFE || '365d' });

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
    const { error: saveRefreshTokenError } = await saveRefreshToken({
      userId: user.user_id,
      refreshToken: refresh_token,
      ip: clientIp
    });

    if (saveRefreshTokenError) {
      console.error('SAVE REFRESH TOKEN ERROR: ', saveRefreshTokenError);
    }

    res.cookie('access_token', access_token);
    res.cookie('refresh_token', refresh_token);
    res.status(200).json({user: { ...user, ...{ access_token }, ...{ refresh_token } }});
  })(req, res, next);
};

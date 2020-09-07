const jwt = require('jsonwebtoken');
const { user: { getUserById } } = require('../../sql');
const {
  JWT: {
    ACCESS_JWT_LIFE,
    REFRESH_JWT_LIFE,
    ACCESS_JWT_SECRET,
    REFRESH_JWT_SECRET
  }
} = require('../../../config');

const decodedRefreshToken = (refreshToken) => {
  try {
    const tokenData = jwt.verify(refreshToken, REFRESH_JWT_SECRET);
    return { tokenData };
  } catch (error) {
    return { error: error.message };
  }
};

const generateAccessJWT = payload => jwt
  .sign(payload, ACCESS_JWT_SECRET, { expiresIn: ACCESS_JWT_LIFE });

const generateRefreshJWT = payload => jwt
  .sign(payload, REFRESH_JWT_SECRET, { expiresIn: REFRESH_JWT_LIFE });

module.exports = async (req, res) => {
  const { body } = req;
  const { refresh_token } = body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Not found refresh token' });
  }

  const { tokenData, error } = decodedRefreshToken(refresh_token);

  if (error) {
    return res.status(500).json({ error });
  }

  const { user_id } = tokenData;
  const payload = { user_id };
  const access_token = generateAccessJWT(payload);
  const new_refresh_token = generateRefreshJWT(payload);
  const { user, error: getUserByIdError } = await getUserById(user_id);

  if (getUserByIdError) {
    return res.status(500).json({ error });
  }

  res.status(200).json({user: { ...user, ...{ access_token }, ...{ refresh_token: new_refresh_token } }});
};

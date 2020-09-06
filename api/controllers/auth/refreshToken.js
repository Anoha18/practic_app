const jwt = require('jsonwebtoken');
const { user: { getUserById } } = require('../../sql');
const accessJwtSecret = process.env.ACCESS_JWT_SECRET;
const refreshJwtSecret = process.env.REFRESH_JWT_SECRET;
const expiresInRefreshToken = process.env.REFRESH_JWT_LIFE;
const expiresInAccessToken = process.env.ACCESS_JWT_LIFE;

const decodedRefreshToken = (refreshToken) => {
  try {
    const tokenData = jwt.verify(refreshToken, refreshJwtSecret);
    return { tokenData };
  } catch (error) {
    return { error: error.message };
  }
};

const generateAccessJWT = payload => jwt
  .sign(payload, accessJwtSecret, { expiresIn: expiresInAccessToken });

const generateRefreshJWT = payload => jwt
  .sign(payload, refreshJwtSecret, { expiresIn: expiresInRefreshToken });

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

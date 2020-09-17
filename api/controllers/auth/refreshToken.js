const jwt = require('jsonwebtoken');
const {
  user: { getUserById },
  refreshToken: {
    saveRefreshToken,
    getRefreshToken,
    updateRefreshToken
  }
} = require('../../sql');
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
  .sign(payload, ACCESS_JWT_SECRET, { expiresIn: ACCESS_JWT_LIFE || '1h' });

const generateRefreshJWT = payload => jwt
  .sign(payload, REFRESH_JWT_SECRET, { expiresIn: REFRESH_JWT_LIFE || '365d' });

const reloadRefreshToken = async({userId, preRefreshToken, newRefreshToken, clientIp}) => {
  const { refreshTokens, error: getRefreshTokenError } = await getRefreshToken({
    refreshToken: preRefreshToken,
    userId,
    closed: false,
    ip: clientIp
  });

  if (getRefreshTokenError) {
    console.error(getRefreshTokenError);
    return { error: getRefreshTokenError };
  }
  if (!refreshTokens.length) {
    const errorMessage = 'Not found pre refresh token';
    console.error(errorMessage);
    return { error: errorMessage };
  }

  const preRefreshTokenInfo = refreshTokens[0];
  const { refreshTokenInfo: newRefreshTokenInfo, error: saveRefreshTokenError } = await saveRefreshToken({
    userId,
    refreshToken: newRefreshToken,
    ip: clientIp,
    parentId: preRefreshTokenInfo.id
  });

  if (saveRefreshTokenError) {
    console.error(saveRefreshTokenError);
    return { error: saveRefreshTokenError };
  };

  const { error: updateRefreshTokenError } = await updateRefreshToken({
    id: preRefreshTokenInfo.id,
    column: 'closed',
    value: true
  });

  if (updateRefreshTokenError) {
    console.error('UPDATE REFRESH TOKEN ERROR: ', updateRefreshTokenError);
  }

  return { newRefreshTokenInfo };
};

module.exports = async(req, res) => {
  const { body } = req;
  const { refresh_token } = body;

  if (!refresh_token) {
    return res.json({ error: 'Not found refresh token' });
  }

  const { tokenData, error } = decodedRefreshToken(refresh_token);

  if (error) {
    return res.json({ error });
  }

  const { user_id } = tokenData;
  const payload = { user_id };
  const access_token = generateAccessJWT(payload);
  const new_refresh_token = generateRefreshJWT(payload);
  const { user, error: getUserByIdError } = await getUserById(user_id);
  const { clientIp } = req;

  if (getUserByIdError) {
    return res.json({ error });
  }

  const { newRefreshTokenInfo, error: reloadRefreshTokenError } = await reloadRefreshToken({
    userId: user_id,
    preRefreshToken: refresh_token,
    newRefreshToken: new_refresh_token,
    clientIp
  });

  if (reloadRefreshTokenError) {
    return res.json({ error: reloadRefreshTokenError });
  }
  if (!newRefreshTokenInfo) {
    return res.json({ error: 'Refresh token not reload' });
  }

  res.status(200).json({user: { ...user, ...{ access_token }, ...{ refresh_token: new_refresh_token } }});
};

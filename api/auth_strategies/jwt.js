const { Strategy, ExtractJwt } = require('passport-jwt');
const { user: { getUserById } } = require('../sql');
const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_JWT_SECRET
};

module.exports = new Strategy(options, async(payload, done) => {
  const { user_id } = payload;
  const { user, error } = await getUserById(user_id);

  if (error) { return done(error, false); }

  done(null, user);
});

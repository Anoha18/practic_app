const { Strategy, ExtractJwt } = require('passport-jwt');
const { user: User } = require('../sql');
const JWT_SECRET = process.env.JWT_SECRET;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

module.exports = new Strategy(options, async(payload, done) => {
  const { user_id } = payload;
  const { user, error } = await User.getUserById(user_id);

  if (error) { return done(error, false); }

  done(null, user);
});

const passport = require('passport');
const {
  jwt,
  local
} = require('../auth_strategies');

passport.use(jwt);
passport.use(local);

module.exports = passport;

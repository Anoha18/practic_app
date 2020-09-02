const passport = require('passport');
const {
  jwt,
  local
} = require('../auth_strategies');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(jwt);
passport.use(local);

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

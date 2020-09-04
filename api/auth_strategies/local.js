const { Strategy } = require('passport-local');
const options = {
  usernameField: 'login',
  passwordField: 'password'
};
const { user: User } = require('../sql');

module.exports = new Strategy(options, async(login, password, done) => {
  const { user, error } = await User.authUser({ login, password });

  if (error) {
    return done(error);
  }

  if (!user) {
    return done(null, false, 'Логин или пароль неверный');
  }

  done(null, user);
});

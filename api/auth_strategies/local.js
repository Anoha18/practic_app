const { Strategy } = require('passport-local');
const options = {
  usernameField: 'login',
  passwordField: 'password'
};
const { user: User } = require('../sql');

const users = [
  { user_id: 1, login: 'anoha', password: '111111' }
];

module.exports = new Strategy(options, async(login, password, done) => {
  const user = users.find(u => (u.login === login) && (u.password === password));
  // const { user, error } = await User.authUser({ login, password });

  // if (error) {
  //   return done(error);
  // }

  if (!user) {
    return done(null, false, { message: 'Login or password incorrect' });
  }

  done(null, user);
});

const passport = require('passport');
const {
  api,
  auth
} = require('../routes');
const bodyParser = require('./bodyParser');
const passportMiddleware = require('./passport');
const getClientIp = require('./getClientIp');

module.exports = (app) => {
  bodyParser(app);
  passportMiddleware(app);

  app.use('*', getClientIp);
  app.use('/auth', auth);
  app.use('/', passport.authenticate('jwt', { session: false }), api);
};

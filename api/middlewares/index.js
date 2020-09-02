const {
  // api,
  auth
} = require('../routes');
const bodyParser = require('./bodyParser');
const passport = require('./passport');

module.exports = (app) => {
  bodyParser(app);
  passport(app);

  app.use('/auth', auth);
  // app.use('/api', api);
};

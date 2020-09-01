const {
  api
} = require('../routes');
const bodyParser = require('./bodyParser');

module.exports = (app) => {
  bodyParser(app);

  app.use('/api', api);
};

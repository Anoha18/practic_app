const auth = require('./auth');
const user = require('./user');
const routes_priority = require('./routes_priority');
const routes = require('./routes');
const addresses = require('./addresses');
const base = require('./base');
const addresses_priority = require('./addresses_priority');

module.exports = {
  auth,
  user,
  routes_priority,
  routes,
  addresses,
  base,
  addresses_priority
};

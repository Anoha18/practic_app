const router = require('express').Router();
const addresses = require('./addresses');
const routes = require('./routes');
const users = require('./users');
const routes_priority = require('./routes_priority');

router.use('/addresses', addresses);
router.use('/routes', routes);
router.use('/users', users);
router.use('/routes_priority', routes_priority);

module.exports = router;

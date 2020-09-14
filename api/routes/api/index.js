const router = require('express').Router();
const addresses = require('./addresses');
const routes = require('./routes');
const users = require('./users');
const routes_priority = require('./routes_priority');
const base = require('./base');

router.use('/addresses', addresses);
router.use('/routes', routes);
router.use('/users', users);
router.use('/routes_priority', routes_priority);
router.use('/base', base);

module.exports = router;

const router = require('express').Router();
const { auth } = require('../../controllers');
const addresses = require('./addresses');
const routes = require('./routes');
const users = require('./users');
const routes_priority = require('./routes_priority');
const base = require('./base');
const addresses_priority = require('./addresses_priority');

router.use('/addresses', addresses);
router.use('/routes', routes);
router.use('/users', users);
router.use('/routes_priority', routes_priority);
router.use('/base', base);
router.use('/addresses_priority', addresses_priority);
router.get('/logout', auth.logout);

module.exports = router;

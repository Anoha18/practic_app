const router = require('express').Router();
const addresses = require('./addresses');
const routes = require('./routes');
const users = require('./users');

router.use('/addresses', addresses);
router.use('/routes', routes);
router.use('/users', users);

module.exports = router;

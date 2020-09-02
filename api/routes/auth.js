const router = require('express').Router();
const { auth } = require('../controllers');

router.post('/local', auth.local);

module.exports = router;

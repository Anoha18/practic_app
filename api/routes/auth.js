const router = require('express').Router();
const { auth } = require('../controllers');

router.post('/local', auth.local);
router.post('/token/refresh', auth.refreshToken);

module.exports = router;

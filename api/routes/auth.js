const router = require('express').Router();
const { auth } = require('../controllers');

router.post('/local', auth.local);
router.get('/logout', auth.logout);
router.post('/token/refresh', auth.refreshToken);

module.exports = router;

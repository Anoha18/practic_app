const router = require('express').Router();
const { auth } = require('../controllers');

router.post('/local', auth.local);
router.post('/token/refresh', auth.refreshToken);
router.post('/register', auth.createUser);
router.get('/check_login', auth.checkLogin);

module.exports = router;

const router = require('express').Router();
const { base } = require('../../controllers');

router.get('/list', base.getBaseList);

module.exports = router;

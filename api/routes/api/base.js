const router = require('express').Router();
const { base } = require('../../controllers');

router.get('/list', base.getBaseList);
router.put('/new', base.saveBase);

module.exports = router;

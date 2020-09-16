const router = require('express').Router();
const { base } = require('../../controllers');

router.get('/list', base.getBaseList);
router.put('/new', base.saveBase);
router.get('/by', base.getBaseBy);

module.exports = router;

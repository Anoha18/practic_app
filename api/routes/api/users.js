const router = require('express').Router();
const { user } = require('../../controllers');

router.get('/:id', user.getUserById);

module.exports = router;

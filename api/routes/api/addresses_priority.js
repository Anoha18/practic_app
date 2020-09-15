const router = require('express').Router();
const { addresses_priority } = require('../../controllers');

router.get('/list', addresses_priority.getAddressesPriorityList);

module.exports = router;
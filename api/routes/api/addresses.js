const router = require('express').Router();
const { addresses } = require('../../controllers')

router.get('/list', addresses.getAddresses);
router.put('/new', addresses.addAddress);

module.exports = router;

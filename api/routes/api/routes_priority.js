const router = require('express').Router();
const { routes_priority } = require('../../controllers');

router.get('/list', routes_priority.getRoutePriorityList);

module.exports = router;
const router = require('express').Router();
const { routes } = require('../../controllers')

router.put('/new', routes.saveRoute);
router.get('/list', routes.getRoutes);

module.exports = router;

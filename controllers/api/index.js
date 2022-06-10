const router = require('express').Router();
const userRoutes = require('./users');
const deviceRoutes = require('./deviceRoutes');

router.use('/users', userRoutes);
router.use('/devices', deviceRoutes);

module.exports = router;

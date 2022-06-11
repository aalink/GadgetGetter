const router = require('express').Router();
const signUpRoutes = require('./sign-up');
const logRoutes = require('./log');

router.use('/signup', signUpRoutes);
router.use('/login', logRoutes);
router.use('/logout', logRoutes);

module.exports = router;
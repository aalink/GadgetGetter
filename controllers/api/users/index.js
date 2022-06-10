const router = require('express').Router();
const signUpRoutes = require('./sign-up');
const logRoutes = require('./log');

router.use('/signup', userRoutes);
router.use('/login' || 'logout', logRoutes);

module.exports = router;

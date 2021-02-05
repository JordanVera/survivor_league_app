const router = require('express').Router();
const indexRouter = require('./index/indexRouter');
const usersRouter = require('./user/userRoutes');

router.use('/', indexRouter);
router.use('/users', usersRouter);

module.exports = router
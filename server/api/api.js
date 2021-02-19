const express = require('express');
const app = express();
const router = require('express').Router();
const dashboardRouter = require('./dashboard/dashboardRouter');
const usersRouter = require('./user/userRoutes');


router.use('/', dashboardRouter);
router.use('/users', usersRouter); 

module.exports = router;
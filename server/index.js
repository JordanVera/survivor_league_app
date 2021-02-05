const express = require('express');
const app = express();
const api = require('./api/api');


const indexRouter = require('./api/index/indexRouter');
const usersRouter = require('../server/api/user/userRoutes');


app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;

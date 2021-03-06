const express = require('express');

const app = express();
const api = require('./api/api');

app.use('/api', api);

app.get('/', (req, res, next) => {
  res.render('welcome');
});

module.exports = app;

const express = require('express');
const router = express.Router();
const User = require('../user/userModel');
const { ensureAuthenticated } = require('../../config/auth');
const _ = require('lodash');


router.get('/dashboard', ensureAuthenticated, async (req, res, next) => {
  const users = await User.find({ bullets: { $gt: 0 } });
  let bulletsArr = [];

  users.forEach(user => {
   bulletsArr.push(user.bullets);
  })

  const bullets = _.sum(bulletsArr);

  res.render('dashboard', {
    users,
    bullets
  });
});

module.exports = router;



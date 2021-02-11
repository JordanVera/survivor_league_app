const User = require('../user/userModel');
const _ = require('lodash');

exports.dashboard = async (req, res, next) => {
  const user = req.user;
  const users = await User.find({ bullets: { $gt: 0 } });
  let bulletsArr = [];
  let picks = [];

  users.forEach(user => {
   bulletsArr.push(user.bullets);
  });

  users.forEach(user => {
    picks.push(user.picks);
  });

  const bullets = _.sum(bulletsArr);

  res.render('dashboard', {
    user,
    users,
    bullets,
    picks
  });
}

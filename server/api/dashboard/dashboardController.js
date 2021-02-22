const User = require('../user/userModel');
const _ = require('lodash');

exports.dashboard = async (req, res, next) => {
  const user = req.user;
  const users = await User.find({ bullets: { $gt: 0 } });
  let bullets = {};
  let bulletsArr = [];
  let picks = [];

  users.forEach(user => {
   bulletsArr.push(user.bullets);
  });

  users.forEach(user => {
    picks.push(user.picks);
  });

  picks.forEach(user => {
    user.forEach((week) => {
      const [key, b] = Object.entries(week)[0];
      const weekN = key.split("-")[1] - 1;
    
      Object.entries(b).forEach(([bullet, value]) => {
        if (!bullets[bullet]) {
          bullets[bullet] = {};
        }
    
        bullets[bullet][weekN] = value;
      });
    });
  })   

  console.log(bullets)

  const totalUserBullets = _.sum(bulletsArr);

  res.render('dashboard', {
    user,
    users,
    bullets: totalUserBullets,
    picks: bullets,
    sPicks: JSON.stringify(bullets)
  });
}
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
const _ = require('lodash');

const User = require('../user/userModel');
const gamesScores = require('../gameScores/getScores.js');

exports.dashboard = async (req, res) => {
  const { user } = req;
  const users = await User.find({ bullets: { $gt: 0 } });
  const { losers } = await gamesScores();
  const bullets = {};
  const bulletsArr = [];
  const picks = [];

  console.log('Losers:', losers);

  users.forEach((user) => {
    picks.push(user.picks);
    bulletsArr.push(user.bullets);
  });

  picks.forEach((user) => {
    user.forEach((week) => {
      const [key, b] = Object.entries(week)[0];
      const weekN = key.split('-')[1] - 1;

      Object.entries(b).forEach(([bullet, value]) => {
        if (!bullets[bullet]) {
          bullets[bullet] = {};
        }
        bullets[bullet][weekN] = value;
      });
    });
  });

  let playingBullets = [];

  const filter = (bulletNumber, userName) => {
    // Get picks of user
    const bullet = `${userName}-${bulletNumber}`;

    // console.log(bulletNumber, userName);

    const userWeeks = Object.values(bullets[bullet] || {});

    // There should not be a loser pick inside of userWeeks
    return !userWeeks.some((weekPick, weekIndex) => {
      // weekPick should not be in losers[`week${weekIndex + 1}`];
      const loserWeek = losers[`week${weekIndex + 1}`];
      const some = loserWeek.includes(weekPick);

      if (some) {
        console.log(`${weekPick} of week ${weekIndex + 1} is inside`, loserWeek);
        bullets[bullet].missingWeek = weekIndex;
      }

      return some;
    });
  };

  users.forEach((u) => {
    const pb = Array(u.bullets)
      .fill('')
      .map((v, index) => index)
      .filter((bulletNumber) => filter(bulletNumber, u.name));

    console.log(u.email, user.email, u.email == user.email);

    if (u.email == user.email) {
      console.log('Playing bullets for user', user.email, pb);
      playingBullets = pb;
    }
  });

  const totalUserBullets = _.sum(bulletsArr);

  console.log('User', user);
  console.log('Users', users);
  console.log('playingBullets', playingBullets);
  console.log('Bullets', bullets);

  res.render('dashboard', {
    user,
    users,
    bullets,
    totalUserBullets,
    playingBullets,
  });
};

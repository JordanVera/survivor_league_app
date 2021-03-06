const express = require('express');
const controller = require('./buyBulletController');

const router = express.Router();

router.route('/buyBullets')
  // .get(controller.getLogin)
  .post(controller.buyBullet);

module.exports = router;

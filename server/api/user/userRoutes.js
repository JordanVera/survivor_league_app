var express = require('express');
var router = express.Router();
const controller = require('./userController');



router.route('/login')
  .get(controller.getLogin)
  .post(controller.postLogin)

router.route('/register')
  .get(controller.getRegister)
  .post(controller.postRegister)

router.route('/logout')
  .get(controller.getLogout)

router.route('/buyBullet')
  .get(controller.buyBullet);


module.exports = router;

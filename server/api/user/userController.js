/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const passport = require('passport');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const chalk = require('chalk');

const User = require('./userModel');
const bulletRepo = require('../buyBullet/buyBulletController');

exports.getLogin = (req, res, next) => {
  res.render('login');
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/api/dashboard',
    failureRedirect: '/api/users/login',
    failureFlash: true
  })(req, res, next);
};

exports.getRegister = (req, res, next) => {
  res.render('register');
};

exports.postRegister = (req, res, next) => {
  const {
    name, email, password, password2
  } = req.body;
  const errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email })
      .then(async user => {
        if (user) {
          errors.push({ msg: 'email is already registered' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          const customerId = await bulletRepo.createCustomer({
            customer: {
              email: newUser.email
            }
          });

          console.log(`customer id = ${customerId}`);
          
          // Password Encryption
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              
              newUser.customerId = customerId;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/api/users/login');
                })
                .catch(error => console.log(error));
            });
          });
        }
      });
  }
};

exports.getLogout = (req, res, next) => {
  req.logout();

  req.flash('success_msg', 'You are logged out');
  res.redirect('/api/users/login');
};

exports.buyBullet = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $inc: { bullets: 1 } },
    { returnNewDocument: true },
    async (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(await req.user);
      res.redirect('/api/dashboard');
    }
  );
};

exports.makePicks = async (req, res, next) => {
  const picks = req.body;
  const { week } = req.params;
  try {
    // eslint-disable-next-line no-underscore-dangle
    const result = await User.findById(req.user._id);
    const data = { [`week-${week}`]: picks };
    const allPicks = [...result.picks];
    if (allPicks.length > 0) {
      // Search index of pick
      const pickIndex = _.findIndex(allPicks, (pick) => Object.keys(pick)[0] == `week-${week}`);

      // If found, update it
      if (pickIndex !== -1) {
        console.log(chalk.green('true'));
        allPicks[pickIndex] = data;
      // eslint-disable-next-line brace-style
      }

      // Otherwise, push new pick
      else {
        console.log(chalk.red('false'));
        allPicks.push(data);
      }
    } else {
      allPicks.push(data);
      console.log(chalk.yellow('results.picks is empty'));
    }

    result.picks = allPicks;
    console.log('allPicks', allPicks);
    await result.save();
    res.redirect('/api/dashboard');
  } catch (error) {
    console.log(error);
  }
};

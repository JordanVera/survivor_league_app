const User = require('./userModel');
const passport = require('passport');
const bcrypt = require('bcryptjs');


exports.getLogin = (req, res, next) => {
  res.render('login');
}

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
}

exports.getRegister = (req, res, next) => {
  res.render('register');
}

exports.postRegister = (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' })
  } 

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' })
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
    User.findOne({ email: email })
      .then(user => {
        if(user) {
          errors.push({ msg: 'email is already registered' })
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

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;

              newUser.password = hash;
              
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err))
            });
          });
        }
      });
  }
}

exports.getLogout = (req, res, next) => {
  req.logout();

  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
}
const User = require('./userModel');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const chalk = require('chalk');

exports.getLogin = (req, res, next) => {
  res.render('login');
}

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/api/dashboard',
    failureRedirect: '/api/users/login',
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
                  res.redirect('/api/users/login');
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
  res.redirect('/api/users/login');
}

exports.buyBullet = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { $inc: { bullets: 1 }}, { returnNewDocument: true }, async function(err, result){ 
  if (err) {
    console.log(err)
  }
  console.log(await req.user);
  res.redirect('/api/dashboard');
  })
}

exports.makePicks = async (req, res, next) => {
  const picks = req.body;
  const { week } = req.params;
  try {
   
    let result = await User.findById(req.user._id);
    const data = { [`week-${week}`]: picks };
    const allPicks = [...result.picks];
    
    if (allPicks.length > 0) {

      // Search index of pick
      const pickIndex = _.findIndex(allPicks, (pick) => {
        return Object.keys(pick)[0] == `week-${week}`;
      });

      // If found, update it
      if (pickIndex !== -1) {
        console.log(chalk.green("true"));
        allPicks[pickIndex] = data;
      }

      // Otherwise, push new pick
      else {
        console.log(chalk.red("false"));
        allPicks.push(data);
      }

    } else {
      allPicks.push(data);
      console.log(chalk.yellow('results.picks is empty'))
    }

    result.picks = allPicks;
    console.log('allPicks', allPicks);
    
    await result.save();
    res.redirect("/api/dashboard");
  } catch (error) {
    console.log(error);
  }
};
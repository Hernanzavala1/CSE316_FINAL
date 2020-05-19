var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/User');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.post('/register', function (req, res) {
  console.log('on post method');
  console.log('register');
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  console.log(req.body.username + ' and password is ' + req.body.password);
  if (username === '' || password === '' || email ==='') {
    console.log('the user nanme is empty');
    res.json({ success: false, msg: 'Please pass username and password.' });
  } else {
    var newUser = new User({
      username: username,
      password: password,
      email: email
    });

    User.findOne({
      email: newUser.email
    })
      .then(user => {
        if (!user) {
          console.log("the user was not  found");
          // save the user
          newUser.save(function (err) {
            if (err) {
              console.log("username already exists!")
              return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
          });

        } else {
          console.log("user already exist ")
          res.json({ error: 'User already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
});


router.post('/login', function (req, res) {
  let email = req.body.email;
  User.findOne(
    {
      email: email,
    },
    function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: 'Authentication failed. User not found.',
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.status(401).send({
              success: false,
              msg: 'Authentication failed. Wrong password.',
            });
          }
        });
      }
    }
  );
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

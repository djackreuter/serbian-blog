const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passport = require('passport');

/**
 * @route  POST api/users/register
 * @desc   Register a new user
 * @access public
 */
router.post('/register', async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send('Email already in use');
  }
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    newUser.save().then((user) => {
      return res.status(200).send(user);
    });
  } catch (err) {
    console.log(err);
  }
});

/**
 * @route  POST api/users/login
 * @desc   Login a user
 * @access public
 */
router.post('/login', async (req, res) => {
  const { email, password } = _.pick(req.body, ['email', 'password']);
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send('Email or password is incorrect');
  }
  let correctPassword = await bcrypt.compare(password, user.password);
  if (correctPassword) {
    let token = await user.generateAuthToken();
    if (token) {
      return res.json({ token: `Bearer ${token}` });
    }
  } else {
    return res.status(400).send('Email or password is incorrect');
  }
});

/**
 * @route  GET api/users
 * @desc   get current user
 * @access private
 */
router.get('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id).then((user) => {
      if (!user) {
        return res.status(404).send('User does not exist');
      }
      return res.send(user);
    }).catch((err) => res.status(400).send(err));
});


module.exports = router;


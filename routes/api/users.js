const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { uploadImage } = require('../../utils/uploadImage');
const { validateRegisterInput } = require('../../validation/register');
const { validateLoginInput } = require('../../validation/login');
 
// TODO: Client side validation

/**
 * @route  POST api/users/register
 * @desc   Register a new user
 * @access public
 */
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      errors.email = 'Email already in use';
      return res.status(400).json(errors);
    }
    let image = '';
    if (!_.isEmpty(req.body.image)) {
      image = JSON.stringify(await uploadImage(req.body.image));
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
      location: req.body.location,
      image
    });
    const user = await newUser.save();
    return res.send(user);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route  POST api/users/login
 * @desc   Login a user
 * @access public
 */
router.post('/login', async (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
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
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route  GET api/users/auth/google
 * @desc   Login a user via google
 * @access public
 */
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  /**
 * @route  GET api/users/auth/google/callback
 * @desc   redirect user after google auth
 * @access public
 */
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  async (req, res) => {
    try {
      const token = await req.user.generateAuthToken();
      if (token) {
        return res.json({ token: `Bearer ${token}` });
      }
    } catch (err) {
      return res.status(400).json({error: 'Could not authenticate', err});
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

/**
 * @route PATCH api/users
 * @desc edit user profile
 * @access private
 */
router.patch('/', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(404).send('Could not find user');
        }
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;
        if (req.body.bio) user.bio = req.body.bio;
        if (req.body.location) user.location = req.body.location;
        if (req.body.image) {
          uploadImage(req.body.image).then((image) => {
            JSON.stringify(image);
            user.image = image;
          });
        }
        const updatedUser = await user.save();
        return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json(err);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const keys = require('../../config/keys');
const { uploadImage } = require('../../utils/uploadImage');
const { validateRegisterInput } = require('../../validation/register');
const { validateLoginInput } = require('../../validation/login');
 
/**
 * @route  POST api/users/register
 * @desc   Register a new user
 * @access public
 */
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const accessCode = keys.ACCESS_CODE;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      errors.email = 'Email already in use';
      return res.status(400).json(errors);
    }
    if (req.body.accessCode !== accessCode) {
      errors.accessCode = 'Access Code is incorrect';
      return res.status(400).json(errors);
    }
    let image = '';
    if (!_.isEmpty(req.body.image)) {
      image = await uploadImage(req.body.image);
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
      location: req.body.location,
      image,
      admin: true
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
    if (!user || user.googleId) {
      errors.login = 'Email or password is incorrect';
      return res.status(404).json(errors);
    }
    let correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      let token = await user.generateAuthToken();
      if (token) {
        return res.json({ token: `Bearer ${token}` });
      }
    } else {
      errors.login = 'Email or password is incorrect';
      return res.status(400).json(errors);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route post api/users/google
 * @desc Find or create google user
 * @access public
 */
router.post('/google', async (req, res) => {
  console.log('google route hit', req.body);
  const { googleId, name, email, imageUrl } = req.body;
  try {
    const user = await User.findOne({ googleId });
    if (user) {
      const token = await user.generateAuthToken();
      return res.json({ token: `Bearer ${token}` });
    }
    const newUser = new User({
      googleId,
      name,
      email,
      image: imageUrl
    });
    const googleUser = await newUser.save();
    const token = await googleUser.generateAuthToken();
    return res.json({ token: `Bearer ${token}` });
  } catch (err) {
    return res.status(400).json(err);
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
 * @route GET api/users/admin
 * @desc get admin user info
 * @access public
 */
router.get('/admin', async (req, res) => {
  try {
    const adminUser = await User.findOne({ admin: true }, 'name bio location image');
    if (!adminUser) {
      return res.status(404).json({ error: 'No user found' });
    }
    return res.send(adminUser);
  } catch(err) {
    return res.status(400).json(err);
  }
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
        if (req.body.image) user.image = await uploadImage(req.body.image);
        const updatedUser = await user.save();
        return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json(err);
    }
});

module.exports = router;

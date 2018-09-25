const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { uploadImage } = require('../../utils/uploadImage');

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
  let image = JSON.stringify(await uploadImage(req.body.image));
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    bio: req.body.bio,
    location: req.body.location,
    image
  });
  newUser.save().then((user) => {
    return res.send(user);
  }).catch((err) => console.log(err));
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

/**
 * @route POST api/users
 * @desc edit user profile
 * @access private
 */
router.post('/', passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    User.findById(req.user.id).then((user) => {
      if (user) {
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
        user.save().then((updatedUser) => res.json(updatedUser));
      }
    });
});

module.exports = router;


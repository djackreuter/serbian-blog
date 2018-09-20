const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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



module.exports = router;


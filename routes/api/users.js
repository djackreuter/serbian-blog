const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');
const _ = require('lodash');

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

router.post('/login', (req, res) => {
  
});



module.exports = router;


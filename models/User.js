const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true,
    maxlength: 1000
  },
  location: {
    type: String
  },
  image: {
    type: String
  }
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.generateAuthToken = function() {
  return new Promise((resolve, reject) => {
    let payload = {
      id: this._id,
      name: this.name
    };
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, 
    (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

const User = mongoose.model('User', UserSchema);

module.exports = { User }
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String
  },
  name: {
    type: String,
    required: () => {
      return !!this.googleId;
    },
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    required: () => {
      return !!this.googleId;
    }
  },
  password: {
    type: String,
    required: () => {
      return !!this.googleId;
    },
    minlength: 6
  },
  bio: {
    type: String,
    required: () => {
      return !!this.googleId;
    },
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
      name: this.name,
      image: JSON.parse(this.image).url
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
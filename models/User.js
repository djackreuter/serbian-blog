const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String
  },
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    required: true
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
    maxlength: 2000
  },
  location: {
    type: String
  },
  image: {
    type: String
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
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
      id: this._id || this.googleId,
      name: this.name,
      image: this.image || this.imageUrl,
      admin: this.admin
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
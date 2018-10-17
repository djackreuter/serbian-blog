const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id).then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }).catch((err) => console.log(err));
  }));
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/users/auth/google/callback'
  }, (accessToken, refreshToken, profile, callback) => {
    User.findOne({ googleId: profile.id }).then((user) => {
      if (user) {
        return callback(null, user);
      }
      const newUser = new User({
        name: profile.displayName,
        googleId: profile.id
      });
      newUser.save().then((user) => {
        return callback(null, user);
      });
    }).catch((err) => callback(err));
  }));
};
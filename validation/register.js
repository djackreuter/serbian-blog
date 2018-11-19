const validator = require('validator');
const _ = require('lodash');

const validateRegisterInput = (data) => {
  let errors = {};
  data.name = !_.isEmpty(data.name) ? data.name : '';
  data.email = !_.isEmpty(data.email) ? data.email : '';
  data.password = !_.isEmpty(data.password) ? data.password : ''; 
  data.password2 = !_.isEmpty(data.password2) ? data.password2 : '';
  data.bio = !_.isEmpty(data.bio) ? data.bio : '';

  if (validator.isEmpty(data.name) || 
    !validator.isLength(data.name, {min: 3})) {
    errors.name = 'Name must be at least 3 characters';
  }
  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }
  if (validator.isEmpty(data.password) || 
    !validator.isLength(data.password, {min: 6})) {
    errors.password = 'Password is not valid';
  }
  if (validator.isEmpty(data.password2) || 
    !validator.equals(data.password, data.password2)) {
      errors.password2 = 'Password confirmation is not valid';
    }
  if (validator.isEmpty(data.bio)) {
    errors.bio = 'Bio is required';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

module.exports = { validateRegisterInput }
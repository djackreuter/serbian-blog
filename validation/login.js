const _ = require('lodash');
const validator = require('validator');

const validateLoginInput = (data) => {
  let errors = {};
  data.email = !_.isEmpty(data.email) ? data.email : '';
  data.password = !_.isEmpty(data.password) ? data.password : '';

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }
  if (validator.isEmpty(data.password)) {
      errors.password = 'Password is not valid'
    }
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

module.exports = { validateLoginInput }

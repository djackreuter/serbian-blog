const _ = require('lodash');
const validator = require('validator');

const validatePostInput = (data) => {
  let errors = {};
  data.title = !_.isEmpty(data.title) ? data.title : '';
  data.body = !_.isEmpty(data.body) ? data.body : '';

  if (validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  if (validator.isEmpty(data.body)) {
    errors.body = 'Body is not valid';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

module.exports = { validatePostInput }
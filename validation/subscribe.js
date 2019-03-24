const _ = require('lodash');
const validator = require('validator');

const validateSubscribeInput = (data) => {
    let errors = {};

    data.firstName = !_.isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !_.isEmpty(data.lastName) ? data.lastName : '';
    data.email = !_.isEmpty(data.email) ? data.email : '';

    if (_.isEmpty(data.firstName)) {
        errors.firstName = 'First name cannot be blank';
    }

    if (_.isEmpty(data.lastName)) {
        errors.lastName = 'Last name cannot be blank';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is not valid';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    };
}

module.exports = { validateSubscribeInput };

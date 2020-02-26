const validator = require("validator");
const validText = require("./valid-text")

module.exports = function (data) {
    let errors = {};
    data.email = validText(data.email) ? data.email : '';
    data.username = validText(data.username) ? data.username : '';
    data.password = validText(data.password) ? data.password : '';

    // If username is empty AND email is not empty AND email is not valid
    if (validator.isEmpty(data.username) &&
        !validator.isEmpty(data.email) &&
        !validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    // If email is empty AND username is NOT empty AND username is not valid
    if (validator.isEmpty(data.email) &&
        !validator.isEmpty(data.username) &&
        !(/^[a-z0-9_.]{3,15}$/.test(data.username))) {
        errors.username = "Username is invalid"
    }

    // If both username AND email fields are empty
    if (validator.isEmpty(data.email) && validator.isEmpty(data.username)) {
        errors.email = "Email or Username is required"
    }
    // if password field is empty
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }

    return {
        errors: errors,
        isValid: Object.keys(errors).length === 0
    }


}



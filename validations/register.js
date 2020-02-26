const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validRegisterInput(data) {

    let errors = {};
    data.name = validText(data.name) ? data.name : ""
    data.email = validText(data.email) ? data.email : ""
    data.password = validText(data.password) ? data.password : ""
    data.password2 = validText(data.password2) ? data.password2 : ""


    // if email is empty
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    // if email does not include @ symbol and .com 
    if (!Validator.isEmail(data.email)) {

        errors.email = "Email is invalid";
    }

    // not empty field
    if (Validator.isEmpty(data.name)) {
        errors.name = "Full name field is required";
    }

    // not empty field
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // ensures password length
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "Password must be between 8 and 30 characters"
    }

    // ensures password is equal to second field password.
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Password must match"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}


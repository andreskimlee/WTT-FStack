const Validator = require("validator"); 
const validText = require("./valid-text");

module.exports = function validRegisterInput(data) {
   
    let errors = {}; 
    data.username = validText(data.username) ? data.username : "" 
    data.fullName = validText(data.fullName) ? data.fullName : ""
    data.email = validText(data.email) ? data.email : "" 
    data.password = validText(data.password) ? data.password : ""
    data.password2 = validText(data.password2) ? data.password2 : ""

    // Username
    if (!Validator.isLength(data.username, {min: 3, max: 15})) {
        errors.username = "Usernames must be between 3 and 15 characters"
    }

    if (!(/^[a-z0-9_.]{0,}$/.test(data.username))) {
        errors.username = "Usernames can only use letters, numbers, underscores and periods."; 
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required"; 
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"; 
    }

    if (!Validator.isEmail(data.email)) { 
       
        errors.email = "Email is invalid"; 
    }

    if (Validator.isEmpty(data.fullName)) {
        errors.fullName = "Full name field is required"; 
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"; 
    }

    if (!Validator.isLength(data.password, {min: 8, max: 30})) {
        errors.password = "Password must be between 8 and 30 characters"
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Password must match"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0 
    }

}


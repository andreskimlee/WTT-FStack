const Validator = require("validator");

module.exports = function validPurchase(data) {

    // validates to ensure the user purchases only whole number stocks.
    let errors = {};
    if (data.stockCount % 1 !== 0) {
        errors.amount = "You can only purchase whole number stock quantities!";
    }




    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}


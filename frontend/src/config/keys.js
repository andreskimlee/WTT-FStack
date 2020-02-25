if (process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV)
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
}
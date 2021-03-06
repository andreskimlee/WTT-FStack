const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema. 
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  funds: {
    type: Number,
    index: true,
    default: 5000,
  },
  portfolio_value: {
    type: Number,
    index: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
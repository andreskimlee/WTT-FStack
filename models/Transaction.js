const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    index: true,
  },
  symbol: {
    type: String,
    required: true,
    index: true,
  },
  amount: {
    type: Number,
    required: true
  },
  stock_count: {
    type: Number,
    required: true
  },
  transaction_type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },

  // isDeleted: { // come back to it verify naming convention. 
  //   type: Boolean,  
  // }

});

module.exports = Transaction = mongoose.model('transactions', TransactionSchema);
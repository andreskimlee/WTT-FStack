const express = require("express");
const router = express.Router();
const Transaction = require("../../models/Transaction");
const passport = require("passport");

router.post("/",
  passport.authenticate("jwt", { session: false }), // when they are logged in to post request (Buy / sell stock) 
  (req, res) => {

    debugger

    const newTransaction = new Transaction({
      user: req.user.id,
      amount: req.body.amount,
      symbol: req.body.symbol,
      stock_count: req.body.stockCount,
      transaction_type: req.body.transactionType,
    })

    newTransaction
      .save()
      .then(transaction => res.json(transaction));
  })

module.exports = router;




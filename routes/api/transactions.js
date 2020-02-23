const express = require("express");
const router = express.Router();
const Transaction = require("../../models/Transaction");
const passport = require("passport");

router.post("/",
  passport.authenticate("jwt", { session: false }), // when they are logged in to post request (Buy / sell stock) 
  (req, res) => {
    console.log("hello")


    const newTransaction = new Transaction({
      user: req.body.user.id,
      amount: req.body.amount,
      symbol: req.body.symbol,
      stock_count: req.body.stockCount,
      transaction_type: req.body.transactionType,
    })

    newTransaction
      .save()

    User.findById(req.body.user.id).then(user => {
      user.funds -= (req.body.stockCount * req.body.amount);
      user.save().then(user => res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        funds: user.funds,
        transaction: newTransaction
      }));
    })


  })

router.get("/:userId", passport.authenticate("jwt", { session: false }), // when they are logged in to post request (Buy / sell stock) 
  (req, res) => {
    Transaction.find({ user: req.params.userId }).then(transactions => res.json(transactions))

  })

module.exports = router;




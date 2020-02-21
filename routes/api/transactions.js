const express = require("express");
const router = express.Router();
const Transaction = require("../../models/Transaction");
const passport = require("passport");

router.post("/",
  passport.authenticate("jwt", { session: false }), // ensures they are logged in to post request (Buy / sell stock) 
  (req, res) => {



    const newPost = new Post({
      user: req.user.id,
      caption: req.body.caption,
      photoURL: req.body.photoURL
    })

    newPost
      .save()
      .then(post => res.json(post));
  })

module.exports = router;




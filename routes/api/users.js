const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs'); // import hasher for registration / pw 
const User = require('../../models/User'); // import user model
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

const jwt = require('jsonwebtoken'); // To setup JSON web token


router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {

    if (user) {
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = {
                id: user.id,
                username: user.username,
                email: user.email
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// users.js
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const password = req.body.password;

  // Search user by either email or by username
  User.findOne({
    $or: [
      { email: req.body.email },
      { username: req.body.username }
    ]
  }).then(user => {
    if (!user) {
      if (req.body.email) {
        errors.email = "This email does not exist";
      } else {
        errors.username = "This username does not exist";
      }
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          funds: user.funds
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });

}
);

router.get('/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
  let userId = req.params.userId;
  User.findById(userId).then(user => res.json(user))

}
);



router.get(`/search`, function (req, res) {
  return User.find({ username: { $regex: "^" + req.query.user_input } }).then(user => res.json(user))
})

// User Follow
router.post("/user/:user_id/follow-user", passport.authenticate("jwt", { session: false }), (req, res) => {

  // Check if the requested user and :user_id is same, return error and status 400
  if (req.user.id === req.params.user_id) {
    return res.status(400).json({ alreadyfollow: "You cannot follow yourself" });
  }

  // Check if the requested user is already in follower list of other user
  User.findById(req.params.user_id)
    .then(user => {
      if (user.followers.filter(follower =>
        follower.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ alreadyfollow: "You are already following this user" });
      }

      // If not already following, push user object with value of the user's ID and save user
      user.followers.push({ user: req.user.id });
      user.save();
      User.findOne({ email: req.user.email })
        .then(user => {
          user.following.push({ user: req.params.user_id });
          user.save().then(user => res.json(user));
        })
        .catch(err => res.status(404).json({ alreadyfollow: "you are already following this user" }));
    });
});

module.exports = router;
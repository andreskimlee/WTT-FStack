const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs'); // import hasher for registration / pw 
const User = require('../../models/User'); // import user model
const keys = require('../../frontend/src/config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

const jwt = require('jsonwebtoken'); // To setup JSON web token

// user register route. 
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // validations on password, email, and name. 
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // ensures there isnt a duplicate email that exists within the database. 
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
      // hashes password to database using bCrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email
              };
              // once user is registered, a jwt token is generated for the user.
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
// Login route for the user ()
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
    ]
  }).then(user => {
    if (!user) {
      if (req.body.email) {
        errors.email = "This email does not exist";
      }
      return res.status(400).json(errors);
    }

    // compares hashed password to received password.
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

// find user by userID. currently not needed but leaving in case of future needs. 
router.get('/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
  let userId = req.params.userId;
  User.findById(userId).then(user => res.json(user))

}
);





module.exports = router;
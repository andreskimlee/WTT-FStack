const mongoose = require('mongoose');
const users = require("./routes/api/users");
const transactions = require("./routes/api/transactions");
const express = require("express"); // initializes and creates server 
const app = express();
const passport = require('passport');
const path = require('path');



app.use(passport.initialize());
require('./frontend/src/config/passport')(passport);

const bodyParser = require('body-parser'); // parse JSON 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const db = require('./frontend/src/config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use("/api/users", users);
app.use("/api/transactions", transactions);






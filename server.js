const mongoose = require('mongoose');
const users = require("./routes/api/users");
const transactions = require("./routes/api/transactions");
const express = require("express"); // initializes and creates server 
const app = express();
const port = process.env.PORT || 5000;

const db = process.env.MONGO_URI
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const bodyParser = require('body-parser'); // parse JSON 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}


app.use("/api/users", users);
app.use("/api/transactions", transactions);
app.listen(port, () => console.log(`Server is running on port ${port}`));





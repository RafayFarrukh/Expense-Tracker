const express = require("express");
const mysql=require('mysql')
const app = express();
const apiauth = require("./middlewares/apiauth");


const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const homeRoutes = require('./routes/home')
const searchRoutes = require('./routes/search')

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to nodeapp application." });
//   console.log("hiii")
// });
const db = require('./models')
const User = db.User
const Record = db.Record
var bodyParser = require("body-parser");

const cors = require('cors');
app.use(cors());



app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoutes)
app.use('/expenses', apiauth, expenseRoutes)
app.use('/', apiauth, homeRoutes)
// app.use('/',  homeRoutes)
app.use('/search',apiauth, searchRoutes)







let port = 4000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
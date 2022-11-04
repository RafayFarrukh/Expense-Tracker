const express = require("express");
const mysql = require("mysql");
const app = express();
const apiauth = require("./middlewares/apiauth");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const homeRoutes = require("./routes/home");
const path = require("path");
const db = require("./models");
const User = db.User;
const Record = db.Record;
var bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  // Serve index.html file if it doesn't recognize the route
  // res.sendFile(path.resolve(__dirname, "Tailwind/build", "index.html")); // <- Here !
  res.sendFile(path.resolve(__dirname, "./client/build/index.html")); // <- Here !
});
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/expenses", apiauth, expenseRoutes);
app.use("/", apiauth, homeRoutes);

let port = 4000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

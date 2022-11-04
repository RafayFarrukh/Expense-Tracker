const express = require("express");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");

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
  res.sendFile(path.resolve(__dirname, "./client/build")); // <- Here !
});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/expenses", apiauth, expenseRoutes);
app.use("/", apiauth, homeRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client", "build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

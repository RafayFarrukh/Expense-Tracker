const express = require("express");
const mysql=require('mysql')
const app = express();



const db=mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rafay123",
})

db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log("MySql connected")
})





let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
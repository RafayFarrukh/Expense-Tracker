const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../models')
const User = db.User
require("dotenv").config();
const jwt = require('jsonwebtoken');
module.exports={
    postRegister: async (req, res) => {


      console.log("lll");
      const { name, email, password} = req.body
      if (!name||!email || !password) {
        return res.status(400).send({ error: "Provide all values" });
      }
      try {
        // Check if this is an existing email, after passing validation
        const user = await User.findOne({ where: { email: email } })
        // an existing email
        if (user) {
         
           res.status(404).json("Email Already Exists")
        }
  else{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) 

    // store user into database
  const newuser =  await User.create({
      name: name,
      email: email,
      password: hash
    })
    res.status(200).json(newuser)
  }
        // new user email
       
         
      } catch (err) { 
        console.log(err)
      }

    },
    postLogin: async (req, res) => {
       const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Provide all values" });
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).send({ error: "User Dont Exists" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if(!isPasswordCorrect){
    return res.status(400).send({ error: "Invalid Password" });
    
  }
  // if (!user || !(await bcrypt.compare(password, user.hash)))
  // const isPasswordCorrect = await user;
  // if (!isPasswordCorrect) {
  //   return res.status(401).send({ error: "Inavlid credentials" });
  // }
  const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, { expiresIn: '70d' });
  // user.password = undefined;
  res.status(201).json({ user, token });
    }
}
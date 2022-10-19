const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../models')
const User = db.User
const Record = db.Record

db.User.hasMany(
  db.Record,
  {
    foreignKey:'UserId',
    as :'record'
});
db.Record.belongsTo(
  db.User,
  {
    foreignKey:'UserId',
    as :'userinfo'
}
  
  )


require("dotenv").config();
const jwt = require('jsonwebtoken');
module.exports={
    postRegister: async (req, res) => {


      console.log("lll");
      const { name, email, password} = req.body
      if (!name||!email || !password) {
        return res.status(400).send({ error: "Provide all values" ,success:false  });
      }
      try {
        // Check if this is an existing email, after passing validation
        const user = await User.findOne({ where: { email: email } ,success:false  })
        // an existing email
        if (user) {
         
           res.status(404).json({error:"Email Already Exists",success:false})
        }
  else{
    // const salt = await bcrypt.genSalt("$2a$10$CwTycUXWue0Thq9StjUM0u")
    const hash = await bcrypt.hash(password, "$2a$10$CwTycUXWue0Thq9StjUM0u") 

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
    return res.status(400).send({ error: "Provide all values",success:false });
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).send({ error: "User Dont Exists" ,success:false });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if(!isPasswordCorrect){
    return res.status(404).send({ error: "Invalid Password",success:false });
     
  }
  // if (!user || !(await bcrypt.compare(password, user.hash)))
  // const isPasswordCorrect = await user;
  // if (!isPasswordCorrect) {
  //   return res.status(401).send({ error: "Inavlid credentials" });
  // }
  const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, { expiresIn: '70d' });
  // user.password = undefined;
  res.status(201).json({ user, token });
    },



    getAll: async (req, res) => {
   const alluser=await User.findAll({
    attributes:['name','email'],
    include:[{
      model:Record
    }]
   })
   res.status(200).json(alluser)
    }
}
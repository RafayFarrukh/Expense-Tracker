const db = require('../models')
const Record = db.Record
const { QueryTypes,Op } = require('sequelize');


module.exports = {
    postNewExpense: async (req, res) => {
        // retrieve input data

        const { name, date, category, amount} = req.body

        if ( !name||!date||!category||!amount ) {
            return res.status(400).send({ error: "Provide all values" });
          }

          const emptytable=await db.sequelize.query('Select * from records WHERE UserId=?',{
            type:QueryTypes.SELECT,
            replacements: [req.user.userID]
        
             }) 
             if (emptytable=='') {
              console.log("(table khali hai)")
             } else { 
              console.log("(table khali nh h hai)")
              
             }
             const expense=await db.sequelize.query('SELECT * FROM records WHERE UserId=? ORDER BY ID DESC LIMIT 1 ',{
              type:QueryTypes.SELECT, 
    replacements: [req.user.userID]
         
           
               })
          

if (emptytable=='') {
  const  newRecord =await new Record({ 
    name: name,  
    category: category,
    date: date, 
    amount: amount, 
    UserId: req.user.userID,
   currentBalance:category=='Expenses'?-amount:amount
  })
  const record= await newRecord.save()
  res.status(200).json({record}) 
}
else{
  const  newRecord =await new Record({ 
    name: name,  
    category: category,
    date: date,
    amount: amount, 
    UserId: req.user.userID,
   currentBalance:category== 'Income'?amount+expense[0].currentBalance:expense[0].currentBalance-amount
  })
  const record= await newRecord.save()
  res.status(200).json({record}) 

}
    //  const record= await newRecord.save()
    //       res.status(200).json({record}) 
        try {
 
        } catch (err) {
          console.log(err)
        }
      },
} 
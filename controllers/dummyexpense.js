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

          const emptytable=await db.sequelize.query('Select * from records  and UserId=?',{
            type:QueryTypes.SELECT,
        
            replacements: [req.user.userID]
             }) 

             const expense=await db.sequelize.query('SELECT * FROM records ORDER BY ID DESC LIMIT 1 and UserId=?',{
              type:QueryTypes.SELECT, 
         
              replacements: [req.user.userID]
               })
               console.log(expense)

if (emptytable=='') {
  var newRecord =await new Record({ 
    name: name,  
    category: category,
    date: date, 
    amount: amount, 
    UserId: req.user.userID,
   currentBalance:category=='Expenses'?-amount:amount
  })
}
else{
  var newRecord =await new Record({ 
    name: name,  
    category: category,
    date: date,
    amount: amount, 
    UserId: req.user.userID,
   currentBalance:category== 'Income'?amount+expense[0].currentBalance:expense[0].currentBalance-amount
  })

}
     const record= await newRecord.save()
          res.status(200).json({record}) 
        try {
 
        } catch (err) {
          console.log(err)
        }
      },
} 
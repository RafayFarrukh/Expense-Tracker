const db = require('../models')
const Record = db.Record



module.exports = {
    postNewExpense: async (req, res) => {
        const { name, date, category, amount} = req.body

        if ( !name||!date||!category||!amount )
            return res.status(400).send({ error: "Provide all values" });

        const records = await Record.findOne({
            where: {UserId: req.user.userID},
            order: [['id', 'DESC']]
        })
        // SELECT * FROM `records` where userID = 1 order by ID Desc limit 1;
        if (records=='') {
          const  newRecord =await new Record({
              name: name,
              category: category,
              date: date,
              amount: amount,
              UserId: req.user.userID,
              currentBalance:category=='Expenses'?-amount:amount
          })
          const record= await newRecord.save()
          res.status(201).json({record})
      }
      else{
          const  newRecord =await new Record({
              name: name,
              category: category,
              date: date,
              amount: amount,
              UserId: req.user.userID,
              currentBalance:category== 'Income'?amount+records.currentBalance:records.currentBalance-amount
          })
          const record= await newRecord.save()
          res.status(201).json({record})

      }
      
    },
}

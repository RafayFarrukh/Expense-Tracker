const db = require('../models')
const Record = db.Record



module.exports = {
    postNewExpense: async (req, res) => {
        // retrieve input data

        const { name, date, category, amount } = req.body

        if ( !name||!date||!category||!amount ) {
            return res.status(400).send({ error: "Provide all values" });
          }
       
        // Find all validation errors in the req in a object
       
        // form passed validation: create new document in record collection
        const newRecord = new Record({
          name: name,
          
          category: category,
          date: date,
          amount: amount,
      UserId: req.user.userID

        })
    
        try {
          // save the document to record collection
    
         const record= await newRecord.save()
          res.status(200).json(record)
        } catch (err) {
          console.log(err)
        }
      },
} 
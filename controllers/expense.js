const db = require('../models')
const Record = db.Record



module.exports = {
    postNewExpense: async (req, res) => {
        // retrieve input data

        const { name, date, category, amount } = req.body

        if ( !name||!date||!category||!amount ) {
            return res.status(400).send({ error: "Provide all values" });
          }
       
 
        const newRecord = new Record({
          name: name,
          
          category: category,
          date: date,
          amount: amount,
          UserId: req.user.userID
          
        })
        
        
 
     const record= await newRecord.save()
          res.status(200).json(record) 

 
   // const element = array[index];
          // const record= await newRecord.save()
          // res.status(200).json(record)
   
  
        try {
          // save the document to record collection
    // res.json(newRecord)
        //  const record= await newRecord.save()
        //   res.status(200).json(record)
        } catch (err) {
          console.log(err)
        }
      },
} 
const db = require('../models')
const Record = db.Record



module.exports = {
    postNewExpense: async (req, res) => {
        const { name, date, category, amount} = req.body

        if ( !name||!date||!category||!amount )
            return res.status(400).send({ error: "Provide all values" });

        const records = await Record.findAll({
            where: {UserId: req.user.userID},
        })

        // 1 record
        // latest

        // SELECT * FROM `records` where userID = 1 order by ID Desc limit 1;

        var last_element = records[records.length - 1];

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
            res.status(200).json({record})
        }
        else{
            const  newRecord =await new Record({
                name: name,
                category: category,
                date: date,
                amount: amount,
                UserId: req.user.userID,
                currentBalance:category== 'Income'?amount+last_element.currentBalance:last_element.currentBalance-amount
            })
            const record= await newRecord.save()
            res.status(200).json({record})

        }
    },
}

const { getFormatedMonth, getChartData,getTotalAmount } = require('../date-process')
const db = require('../models')
const Record = db.Record
const categories = { 'Expenses': 0, 'Income': 0 }

module.exports = {
    getHome: async (req, res) => {
      try {
        // retrieve all expense from record collection
        const records = await Record.findAll({
          where: { UserId: req.user.userID },
          order: [['date', 'DESC']]
        })
       
    const categories = { 'Expenses': 0, 'Income': 0 }
        
    
        // find total expense
       
        const totalAmount = 
        records.reduce((acc, cur) => 
       
   
        acc + cur.amount, 0
               
          )

// const totalAmount=getTotalAmount(records)
        const chartData = getChartData(records)
        // check if any record is found
        const isEmptyRecord = records.length ? false : true
        // find total month
        const months = []
        records.forEach(record => {
          const displayDate = getFormatedMonth(record)
          if (months.includes(displayDate)) { return }
          months.push(displayDate)
        })
   res.status(200).json({records,totalAmount, months, chartData, showChart: true, isEmptyRecord })
      } catch (err) {
        return console.log(err)
      }
    }
  }
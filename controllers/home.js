const { getFormatedMonth, getChartData,getTotalAmount } = require('../date-process')
const db = require('../models')
const Record = db.Record
const categories = { 'Expenses': 0, 'Income': 0 }
const { QueryTypes,Op } = require('sequelize');
const { sequelize } = require('../models');

module.exports = {
    getHome: async (req, res) => {
      try {
        // retrieve all expense from record collection
        const records = await Record.findAll({
          where: { UserId: req.user.userID },
          order: [['date', 'DESC']]
        })
  
   const expense=await db.sequelize.query('Select amount from records WHERE category="Expenses" and UserId=? ',{
  type:QueryTypes.SELECT,
  replacements: [req.user.userID]

   })
   const Expense = expense.reduce((acc, o) => acc + parseInt(o.amount), 0)
  //  console.log(Expense);
   const income=await db.sequelize.query('Select amount from records WHERE category="Income"  and UserId=?',{
    type:QueryTypes.SELECT,
    replacements: [req.user.userID]

 

     })
     const Income = income.reduce((acc, o) => acc + parseInt(o.amount), 0)
 

   const  totalAmount=Income-Expense
console.log(totalAmount)

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
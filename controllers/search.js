const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const { getDateCriteria, getFormatedMonth, getChartData } = require('../date-process')
const categories = [ 'Expenses', 'Income']
const availableDate = { begin: new Date('2000-01-01'), end: new Date('2030-01-01') }

// Include models
const db = require('../models')
const Record = db.Record

module.exports = {
  getSearchExpense: async (req, res) => {
    // keep filtered options
    const { month, category, defaultCategory, defaultMonth, monthReset, categoryReset } = req.query
    const selectedMonth = (monthReset || (!month && !defaultMonth)) ? null
      : month ? month : defaultMonth
// const selectedMonth=req.body
    const selectedCategory = (categoryReset || (!category && !defaultCategory)) ? null
      : category ? category : defaultCategory

    const months = []

    try {
      // find all records
      const allRecords = await Record.findAll({
        where: { UserId: req.user.userID },
        order: [['date', 'DESC']]
      })

      // get month options for filter
      allRecords.forEach(record => {

        const displayDate = getFormatedMonth(record, false)
        if (months.includes(displayDate)) { return }
        months.push(displayDate)
      })

      // find matching records
      const displayRecords = await Record.findAll({
        where: {
          date: selectedMonth ? getDateCriteria(selectedMonth) : { [Op.between]: [availableDate.begin, availableDate.end] },
          category: selectedCategory ? selectedCategory : { [Op.or]: categories },
          UserId:req.user.userID
        },
        order: [['date', 'DESC']]
      })
      console.log(displayRecords);

      // check if any record is found
      const isEmptyRecord = displayRecords.length ? false : true
      // find total expense
      const totalAmount = displayRecords.reduce((acc, cur) => acc + cur.amount, 0)
      // get chart data
      
      const chartData = getChartData(displayRecords)
      res.status(200).json({  records: displayRecords, totalAmount, selectedCategory, selectedMonth, months, chartData, showChart: true, isEmptyRecord })

      // res.render('index', { indexCSS: true, records: displayRecords, totalAmount, selectedCategory, selectedMonth, months, chartData, showChart: true, isEmptyRecord })
    } catch (err) {
      console.log(err)
    }
  }
}
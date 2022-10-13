const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  getDateCriteria: selectedMonth => {
    if (!selectedMonth) { return {} }

    // get next month
    let nextMonth = new Date(selectedMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    return { [Op.between]: [new Date(selectedMonth), nextMonth] }
  },
  getFormatedMonth: record => {
    const date = new Date(record.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return `${year}/${month}`
  },
  getChartData: records => {
    const categories = { 'Expenses': 0, 'Income': 0 }
    records.forEach(record => { 
    
      categories[record.category] += record.amount
    
    })
    return Object.values(categories)
  },
  
}
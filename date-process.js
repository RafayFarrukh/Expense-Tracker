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
      //  if (record.category=='Expenses') {
      //   categories[record.category=='Expenses'] -= record.amount
      //   console.log(record.amount);
      //  }
      //  else if(record.category=='Income') {
      //   categories[record.category=='Income'] += record.amount
      //   console.log(record.amount);

      //  }
     
      categories[record.category] += record.amount
      
    //  console.log(record.category);
    //  if (record.category=='Expenses') {
    //   categories[record.category] -= record.amount
    //   console.log(record.category)
    //  }
    //  else if(record.category=='Income'){
    //   categories[record.category] += record.amount
    //   console.log(record.category)

    //  }
    })
    return Object.values(categories)
  },
  getTotalAmount:records=>{
    var c=b
  var b=0
    var Amount=0
   

    records.forEach(record => {
      // console.log(record.category)
      // console.log(record.amount)
     if (record.category=='Income') {
   
     console.log( 
   
      records.reduce((acc, cur) => 
       
   
  b=  acc + record.amount, Amount
            
       )
       ); 
       console.log(b)
     }
     else if (record.category=='Expenses'){
      console.log( 
   
        records.reduce((acc, cur) => 
         
     
    b=  acc - cur.amount, Amount
              
         )
         ); 
     }
     console.log(b)
       })

  }
}
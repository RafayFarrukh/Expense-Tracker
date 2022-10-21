const db = require('../models')
const Record = db.Record
const { QueryTypes,Op } = require('sequelize');
const { sequelize } = require('../models');
const availableDate = { begin: new Date('2022-10-06'), end: new Date('2022-11-7') }
const { getDateCriteria, getFormatedMonth, getChartData } = require('../date-process')

const categories = [ 'Expenses', 'Income']

module.exports = {
    getReport: async (req, res) => {
       
      
    }}
    
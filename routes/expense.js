const express = require('express')
const router = express.Router()

// Include Controllers
const isAuthenticated = require('../config/auth')
const expenseController = require('../controllers/expense')

router.post('/new',  expenseController.postNewExpense)

module.exports = router;
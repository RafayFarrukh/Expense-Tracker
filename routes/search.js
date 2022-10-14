const express = require('express')
const router = express.Router()
// Include controllers
const searchController = require('../controllers/search')

// Include authentication middleware


router.post('/', searchController.getSearchExpense)

module.exports = router
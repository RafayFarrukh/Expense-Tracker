const express = require('express')
const router = express.Router()

// Include Controllers
const reportController = require('../controllers/report')

router.post('/report',  reportController.getReport)

module.exports = router;
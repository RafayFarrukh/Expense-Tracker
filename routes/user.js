const express = require('express')
const router = express.Router()


const userController = require('../controllers/user')

// signup page
router.post('/register',userController.postRegister)
router.post('/login',
    userController.postLogin
  )
  router.get('/get',
    userController.getAll
  )


module.exports = router

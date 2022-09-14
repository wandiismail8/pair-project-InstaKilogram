const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()



router.get('/register', userController.registerForm)
router.post('/register', userController.postRegister)





module.exports = router
const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()



router.get('/register', userController.registerForm)
router.post('/register', userController.postRegister)
router.get('/login', userController.loginForm)
router.post('/login', userController.postLogin)

router.get('user/:id')
// router.get('/user', userController.readAllUser)





module.exports = router
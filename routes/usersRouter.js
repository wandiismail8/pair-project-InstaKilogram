const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()



router.get('/register', userController.registerForm)
router.post('/register', userController.postRegister)
router.get('/login', userController.loginForm)
router.post('/login', userController.postLogin)
router.get('/register/:username', userController.profileForm)
router.post('/register/:username', userController.postProfile)
router.get('/logout', userController.logout)





module.exports = router
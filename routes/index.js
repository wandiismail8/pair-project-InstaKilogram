const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const userRouter = require('./usersRouter')

router.get('/' , userController.home)

router.use('/', userRouter)


module.exports = router
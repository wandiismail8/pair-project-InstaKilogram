const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const userRouter = require('./usersRouter')
const profileRouter = require('./profileRouter')

router.get('/' , userController.home)

router.use('/', userRouter)
router.use('/', profileRouter)


module.exports = router
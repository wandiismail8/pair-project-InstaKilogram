const express = require('express')
const router = express.Router()
const userRouter = require('./usersRouter')

router.use('/', userRouter)


module.exports = router
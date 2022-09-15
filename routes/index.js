const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const userRouter = require('./usersRouter')
const profileRouter = require('./profileRouter')

router.use('/', userRouter)
router.use(function (req, res, next) {
  console.log(req.session);
  if(!req.session.user) {
    const error = "Please login first!";
    res.redirect(`/login?${error}`)
  }else{
    next()
  }
})
router.use('/', profileRouter)


module.exports = router
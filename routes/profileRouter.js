const express = require('express')
const userController = require('../controllers/profileController')
const router = express.Router()



router.get('/:profileName', userController.profile)

module.exports = router
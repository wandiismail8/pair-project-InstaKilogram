const express = require('express')
const userController = require('../controllers/profileController')
const router = express.Router()



// router.use(function(req,res, next){
//     console.log(res.session);
// })


router.get('/:profileName', userController.profile)

module.exports = router
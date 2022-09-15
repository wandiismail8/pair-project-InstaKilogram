const express = require('express')
const profileController = require('../controllers/profileController')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/' , userController.home)
router.get('/delete/:id', profileController.deletePost)
router.get('/:username', profileController.profile)
router.get('/:username/add', profileController.addProfile)
router.post('/:username/add', profileController.addProfileSubmit)
router.get('/:username/edit', profileController.editProfile)
router.post('/:username/edit', profileController.editProfileSubmit)


module.exports = router
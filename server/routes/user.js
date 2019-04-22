const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/weblogin', UserController.webLogin)

// Google Login not yet implemented
// router.post('/googleLogin', UserController.googleLogin)

module.exports = router
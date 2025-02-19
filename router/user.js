const express = require('express')
const router = express.Router()
const middleware = require('../middleware/index')
const userController = require('../controllers/userController')

router.post('/signup',
    middleware.isCredentialsExist,
    middleware.isEmailNotexist,
    middleware.hashPassword,
    userController.signup)


router.post('/signin',
    middleware.isCredentialsExist,
    middleware.isEmailExist,
    middleware.comparePassword,
    userController.signin)



router.get('/get-user', middleware.verifyToken, userController.getUser)

module.exports = router

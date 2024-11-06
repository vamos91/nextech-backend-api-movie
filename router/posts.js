const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const middleware = require('../middleware/index')

router.get('/', middleware.auth, postController.read)
router.get('/:id', postController.readOne)
router.post('/', middleware.isCredentialsExist, middleware.isEmailExist, postController.create)
router.put('/:id', postController.update)
router.delete('/:id', postController.destroy)

module.exports = router
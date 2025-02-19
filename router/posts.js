const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.get('/',postController.read)
router.get('/:id', postController.readOne)
router.post('/', postController.create)
router.put('/:id', postController.update)
router.delete('/:id', postController.destroy)

module.exports = router
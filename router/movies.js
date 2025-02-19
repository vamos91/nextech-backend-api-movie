const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')
//const middleware = require('../middleware/index')


//SEED
router.get('/seed', movieController.seedApi)
//READ all
router.get('/', movieController.readAll)
//READ one
router.get('/:id', movieController.readOne)
//CREATE
router.post('/', movieController.create)
//UPDATE
router.patch('/:id', movieController.update)
//DELETE
router.delete('/:id', movieController.destroy)


module.exports = router
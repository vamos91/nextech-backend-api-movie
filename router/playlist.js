const express = require('express')
const router = express.Router()
const middleware = require('../middleware/index')
const playlistController = require('../controllers/playlistController')

//Read all my playlist
router.get('/', middleware.verifyToken, playlistController.readAll)
router.post('/', middleware.verifyToken, playlistController.create)
router.get('/:id', middleware.verifyToken, playlistController.readOne)
//router.put('/:id', middleware.verifyToken, playlistController.update)

router.get('/:playlist/movie/:movie', middleware.verifyToken, playlistController.addMovie)
module.exports = router
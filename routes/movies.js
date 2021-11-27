const express = require('express')
const router = express.Router()
const productControllers = require('../controllers/movies')
// const authorize = require('../middlewares/auth')

router.get('/get-allmovies', productControllers.getAllMovies)

router.post('/add-movie', productControllers.addMovie)

router.put('/edit-movie', productControllers.editMovie)

router.delete('/delete-movie', productControllers.deleteMovie)

module.exports = router;
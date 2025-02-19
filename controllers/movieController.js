const axios = require('axios');
const movies = []
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.seedApi = async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODY2ZjkyNGMzM2VkNjcwODk0Mjk3NjVjYWExYTFiMiIsIm5iZiI6MTczMDg4MjQxMi4zNjkwODQ0LCJzdWIiOiI2MGNiODExNDg3ZTYzZTAwMjg1YjcxZWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NQFzR2oL5Bntn0IZnGL8nQMV24efcDEuJ2WrmV59_to'
        }
    };
    axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => {            
            response.data.results.map(async(el) => {
                movies.push(el)
                console.log(el.original_title)
                 await prisma.movies.create({
                    data: {
                        title: el.original_title,
                        desc: el.overview,
                        poster: el.poster_path
                        }
                })
            });
            res.json({ data: response.data.results })
        })
}



exports.readAll = (req, res) => {
    res.json({movies: movies})
}

exports.readOne = (req, res) => {
    const id = req.params.id
    const movie = movies.find((movie) => movie.id === parseInt(id))
    res.json({movie: movie})
}

exports.create = (req, res) => {
    const data = req.body
    console.log(data)
    const movieObj = {
        id: movies.length + 1,
        title: data.title,
        desc: data.desc,
        img: data.img
    }
    movies.push(movieObj)
    res.json({'new movie added': movies})
}

exports.update = (req, res) => {
    const id = req.params.id
    const movie = movies.find((movie) => movie.id === parseInt(id))

    movie.title = req.body.title || movie.title
    movie.overview = req.body.overview || movie.overview
    movie.poster_path = req.body.poster_path || movie.poster_path

    res.json({movies: movies})
}

exports.destroy = (req, res) => {
    const id = req.params.id
    const movie = movies.find((movie) => movie.id === parseInt(id))
    const indexOfMovie = movies.indexOf(movie)
    console.log(indexOfMovie)
    movies.splice(indexOfMovie, 1)
    res.json({movies: movies})
}
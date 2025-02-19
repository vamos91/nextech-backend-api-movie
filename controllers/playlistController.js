const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.readAll = async (req, res) => {
    console.log('playlist controller readAll', req.body)
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
   const playlists =  await prisma.playlist.findMany({
        where: {
            user_id: user.id
        }
   })
    console.log('playlist from one user', playlists)
}

exports.create = async (req, res) => {
   const playlist = await prisma.playlist.create({
        data: {
            title: req.body.title,
            desc: req.body.desc
        }
   })
    if (playlist) {
        res.json({message: 'New playlist created'})
    }
}

exports.readOne = async (req, res) => {
    const playlist = await prisma.playlist.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (playlist) {
        const movies_has_playlist = await prisma.movies_has_playlist.findMany({
            where: {
                playlist_id: parseInt(playlist.id)
            }
        })

        const movieListId = movies_has_playlist.map((item) => {
            return item.movies_id
        })
        const movie = await prisma.movies.findMany({
            where: {
                id: {in: movieListId}
            }
        })
    
        res.json({playlist: playlist, movie_list: movie})
    }
}

exports.addMovie = async (req, res) => {
    const playlist_id = req.params.playlist
    const movie_id = req.params.movie
    console.log(playlist_id, movie_id)
    const movies_has_playlist = await prisma.movies_has_playlist.create({
        data: {
            movies_id: parseInt(movie_id),
            playlist_id: parseInt(playlist_id)
        }
    })
    if (movies_has_playlist) {
        res.json({message: 'New movie added to playlist'})
    }
}

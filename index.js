const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const postsRouter = require('./router/posts')
const movieRouter = require('./router/movies')
const userRouter = require('./router/user')
const playlistRouter = require('./router/playlist')

app.use(cors())
app.use(express.json())
app.use('/posts', postsRouter)
app.use('/movies', movieRouter)
app.use('/auth', userRouter)
app.use('/playlist', playlistRouter)

app.listen(port, () => {
    console.log('App listen on localhost: ' + port)
})
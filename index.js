const express = require('express')
const app = express()
const port = 3000
const postsRouter = require('./router/posts')
const movieRouter = require('./router/movies')

app.use(express.json())
app.use('/posts', postsRouter)
app.use('/movies', movieRouter)

app.listen(port, () => {
    console.log('App listen on localhost: ' + port)
})
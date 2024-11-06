
const posts = require('../data/posts')

exports.read = (req, res) => {
    res.json({ posts: posts })
}

exports.readOne = (req, res) => {
    const id = req.params.id
    const resultat = posts.find((post) => post.id === parseInt(id))
    res.json({post: resultat})
}

exports.create = (req, res) => {
    console.log(req.currentUser)
    // console.log(req.body.title)
    // console.log(req.body.body)
    // const newObject = {
    //     "userId": 10,
    //     "id": posts.length + 1,
    //     "title": req.body.title,
    //     "body": req.body.body
    // }
    // posts.push(newObject)
    // res.json({post: newObject})
}

exports.update = (req, res) => {
    const post = posts.find((post) => post.id === parseInt(req.params.id))
    post.title = req.body.title || post.title,
    post.body = req.body.body || post.body
    res.json({message: post})
}

exports.destroy = (req, res) => {
    const post = posts.find((post) => post.id === parseInt(req.params.id))
    posts.splice(post.id - 1, 1)
    res.json({message: `posts ${post.id} deleted`})
}
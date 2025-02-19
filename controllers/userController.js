const connection = require('../database/connection')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.signup = async (req, res) => {
    console.log(req.body)
    await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password,
            role: 'admin'
        }
    })
    const users = await prisma.user.findMany()
    res.status(200).json({users: users})
}

exports.signin = (req, res) => {
    const token = jwt.sign({ iss: 'blog_v2', role: 'basic_user', email: req.body.email }, 'disney', { expiresIn: '1h' })
    if (token) {
        //res.status(200).json({ token: token})
        res.cookie(token).status(200).json({message: 'user auth  ok !'})
    }
    
    console.log(token)
}

exports.getUser = (req, res) => {
    //req.body
}
const connection = require('../database/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.isCredentialsExist = (req, res, next) => {
    if (req.body.email && req.body.password) {
        req.email = req.body.email
        next()
    } else {
        res.json({message: 'Missing credentials'})
    }
}


exports.isEmailNotexist = (req, res, next) => {
    const email = req.email
    const sql = 'select * from user where email = ?'
    connection.query(sql, [email], (err, data, field) => {
        if (!err) {
            console.log('response from DB', data)
            if (data.length <= 0) {
                next()
            } else {
                res.status(301).json({message: 'Email already exist'})
            }
        } else {
            console.log('err from sql request', err)
        }
    })
}

exports.isEmailExist = (req, res, next) => {
    const email = req.email
    const sql = 'select * from user where email = ?'
    connection.query(sql, [email], (err, data, field) => {
        if (!err) {
            console.log('response from DB', data)
            req.userData = data
            if (data.length <= 0) {
                res.status(301).json({message: 'Email not exist'})
            } else {
                next()
            }
        } else {
            console.log('err from sql request', err)
        }
    })
}

exports.comparePassword = (req, res, next) => {
    const plainPassword = req.body.password
    const data = req.userData
    if (bcrypt.compareSync(plainPassword, data[0].password)) {
        next()
    } else {
        res.json({message: 'Bad email or password'})
    }

}


exports.hashPassword = (req, res, next) => {
    const userData = req.body
    const password = req.body.password
    const hashedPassword = bcrypt.hashSync(password, 12)
    if (hashedPassword !== undefined) {
        req.body.password = hashedPassword
        next()
    } else {
        res.status(500).json({message: 'Erreur serveur'})
    }
}

exports.verifyToken = (req, res, next) => {
   //console.log('verif pass', req.headers.cookie)
     if(req.headers.cookie){
         token = req.headers.cookie.split("=")
    }else{
        res.status(401).json({ message: 'Unauthorized !' })
     }
    
     try {
        const decodedToken = jwt.verify(token[0], 'disney')
        req.userData = decodedToken
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({message: error})
    }
}
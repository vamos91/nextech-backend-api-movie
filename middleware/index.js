exports.isCredentialsExist = (req, res, next) => {
    if (req.body.email && req.body.password) {
        next()
    } else {
        res.json({message: 'Missing credentials'})
    }
}

exports.isEmailExist = (req, res, next) => {
    const email = req.body.email
    const emailExist = true
    const currentUser = 'tony@stark.fr'
    //Search if exist in DB
    if (emailExist) {
        req.currentUser = currentUser
        next()
    } else {
        res.json({message: 'User not found'})
    }
}

exports.verifyToken = (req, res, next) => {
    //is token exist
    const token = true
    if (token) {
        next()
    } else {
        res.status(403).json({message: 'Forbidden'})
    }
}

exports.auth = (req, res, next) => {
   const user = req.currentUser
   next()
}
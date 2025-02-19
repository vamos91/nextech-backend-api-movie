const mysql = require('mysql2')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'blog_v2',
    password: 'acard'
})

connection.getConnection((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Vous êtes connecté à la database')
    }
})

module.exports = connection
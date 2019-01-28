const sql = require('mssql')


const config = {
    user: 'mychandler',
    password: 'password123!',
    server: 'vws13c10\\itservice', // You can use 'localhost\\instance' to connect to named instance
    database: 'mychandler',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    },
    accessTokenTTL: 300
}

const pool = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, pool
}
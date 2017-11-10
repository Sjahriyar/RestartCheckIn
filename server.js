const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const ejs = require('ejs')
const app = express()


//Setup View Engine
app.set('view engine', 'ejs')

//MySql configuration
var mysql = require('mysql'), // node-mysql module
    myConnection = require('express-myconnection'), // express-myconnection module
    dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'root',
      port: 3306,
      database: 'checking_system'
    }
//END MySql

//Middle-Wares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(myConnection(mysql, dbOptions, 'single'))

//Route
app.use('/', require('./controllers/admin'))
app.use('/bootcamp', require('./controllers/bootcamp'))
app.use('/students', require('./controllers/students'))
app.use('/records', require('./controllers/records'))

//Server Listen to port
app.listen(process.env.PORT || 4500, ()=>{
  console.log('Server is running on port 4500')
})

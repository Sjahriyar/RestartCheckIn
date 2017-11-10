const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

const app = express()

//MySql configuration
var mysql = require('mysql'), // node-mysql module
    myConnection = require('express-myconnection'), // express-myconnection module
    dbOptions = {
      host: 'localhost',
      user: '',
      password: '',
      port: 3306,
      database: ''
    }
//END MySql

//Middle-Wares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(myConnection(mysql, dbOptions, 'single')

//Route
// app.use('/', require('./controllers/logreg'))


//Server Listen to port
app.listen(process.env.PORT || 4500, ()=>{
  console.log('Server is running on port 4500')
})

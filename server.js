const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const ejs = require('ejs')
const app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())
//Setup View Engine
app.set('view engine', 'ejs')

//static folder
app.use(express.static('./public'))

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

app.use(myConnection(mysql, dbOptions, 'single'))

//Route
app.use('/',urlencodedParser, require('./controllers/admin'))
app.use('/bootcamp',urlencodedParser, require('./controllers/bootcamp'))
app.use('/students',urlencodedParser, require('./controllers/students'))
app.use('/records',urlencodedParser, require('./controllers/records'))
app.use('/editstud',urlencodedParser, require('./controllers/edit_students'))

//Server Listen to port
app.listen(process.env.PORT || 4500, ()=>{
  console.log('Server is running on port 4500')
})

const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      ejs = require('ejs'),
      flash = require('express-flash'),
      app = express();

//BodyParser MiddleWare to encode request from body
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
// app.use(express.cookieParser('keyboard cat'))
// app.use(express.session({ cookie: { maxAge: 60000 }}))
// app.use(flash())

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

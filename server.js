const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      ejs = require('ejs'),
      flash = require('connect-flash'),
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
app.use(session({
  secret: 'Oh it is sO Secure',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 160000 }
}))

//Session Set to store admin data
app.use(function(req, res, next){
    res.locals.user_session = req.session.admin;
    next();
});

//Express Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Authentication Control check if user is logged in, grant access to other pages
var authenticate = function (req, res, next) {

  if (req.session.admin) {
    next();
  }
  else {
    res.redirect('/')
  }
}
//Routes
app.use('/',urlencodedParser, require('./controllers/admin'))
app.use('/bootcamp',urlencodedParser, authenticate, require('./controllers/bootcamp'))
app.use('/students',urlencodedParser, authenticate, require('./controllers/students'))
app.use('/records',urlencodedParser, authenticate, require('./controllers/records'))
app.use('/show',urlencodedParser, authenticate, require('./controllers/records'))
app.use('/seestuds',urlencodedParser, authenticate, require('./controllers/see_students'))
app.use('/checkIn',urlencodedParser, require('./controllers/current_checked_in'))

//Server Listen to port
app.listen(process.env.PORT || 4500, ()=>{
  console.log('Server is running on port 4500')
})

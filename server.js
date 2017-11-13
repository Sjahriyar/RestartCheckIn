const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      cookieParser = require('cookie-parser'),
     session = require('express-session'),
    expressValidator = require('express-validator'),
      ejs = require('ejs'),
      flash = require('express-flash'),
      app = express();

// app.use( express.cookieParser() );
      // From - https://github.com/ctavan/express-validator
      app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

          while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
          }
          return {
            param : formParam,
            msg   : msg,
            value : value
          };
        }
      }));
      // End of express-validator

// //Set Session for the application
// app.use(session({
//   cokkieName:session,
//   sercet:'jkfhkjhfdkk8jhhj',
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000,
// }));

//BodyParser MiddleWare to encode request from body
var urlencodedParser = bodyParser.urlencoded({ extended: true })
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
      password: 'sasa',
      port: 3306,
      database: 'checking_system'
    }
//END MySql

//Middle-Wares
// app.use(cors())
app.use(cors({
    origin:['http://localhost:4500'],
    methods:['GET','POST', 'DELETE', 'PUT'],
    credentials: true // enable set cookie
}));

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

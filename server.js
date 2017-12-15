const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      expressValidator = require('express-validator'),
      ejs = require('ejs'),
      flash = require('express-flash'),
      formidable = require('formidable'),
      http = require('http'),
      fs = require('fs'),

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


//BodyParser MiddleWare to encode request from body
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json())

//Setup View Engine
app.set('view engine', 'ejs')

//static folder
app.use(express.static('./public'))

//MySql33 configuration
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



app.use(session({
  secret: 'Oh it is sO Secure',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1600000 }
}))

app.use(function(req, res, next){
    res.locals.user_session = req.session.admin;
    res.locals.user_pws = req.session.org_pws;
    res.locals.phx = req.session.phname;
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
    res.redirect('/admin')
  }
}

//Route

app.use('/',urlencodedParser, require('./controllers/main'))
app.use('/main',urlencodedParser, require('./controllers/main'))
app.use('/chart',urlencodedParser, require('./controllers/chart'))
app.use('/show',        urlencodedParser,               require('./controllers/current_checked_in'))
app.use('/bootcamp',urlencodedParser, authenticate, require('./controllers/bootcamp'))
app.use('/students',urlencodedParser, authenticate, require('./controllers/students'))
app.use('/admin',urlencodedParser, require('./controllers/admin'))
// app.use('/studentsAfterrImg',urlencodedParser, require('./controllers/students'))
 app.use('/upload',urlencodedParser, authenticate, require('./controllers/upload'))
 app.use('/upload2',urlencodedParser, authenticate, require('./controllers/upload2'))
app.use('/records',urlencodedParser, authenticate, require('./controllers/records'))
app.use('/editstud',urlencodedParser, authenticate, require('./controllers/see_students'))
app.use('/exceptions',urlencodedParser, authenticate , require('./controllers/exceptions'))
app.use('/see_students',urlencodedParser, authenticate, require('./controllers/see_students'))
app.use('/reports', urlencodedParser, authenticate, require('./controllers/reports'))
app.use('/logindet',urlencodedParser, authenticate, require('./controllers/logindet'))
app.use('/logout',urlencodedParser, require('./controllers/logout'))


//Server Listen to port
app.listen(process.env.PORT || 4500, ()=>{
  console.log('Server is running on port 4500')
})

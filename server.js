// load the things we need
var express = require('express');
var mysql = require('mysql');
var app = express();

var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "sasa",
      database: "checking_system"
    });

// set the view engine to ejs
app.set('view engine', 'ejs');

// new student page 
app.get('/newstudent', function(req, res) {
	 con.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
        if (err) throw err;


          res.render('pages/newstudent',{result : result});
      });
          
});




// about page 
app.get('/about', function(req, res) {
      con.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
        if (err) throw err;
          res.render('pages/about',{result : result});
      });
});



// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	res.render('pages/index');
	       
});



app.listen(8080);
console.log('8080 is the magic port');
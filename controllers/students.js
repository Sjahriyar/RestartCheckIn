const express = require('express')
const session = require('express-session')
const router = express.Router()
const fileUpload = require('express-fileupload');
var expressValidator = require('express-validator');
var mysql = require('mysql');




router.get('/', (req,res)=>{
  var hour = 3600000
req.session.cookie.expires = new Date(Date.now() + hour)
req.session.cookie.maxAge = hour
 req.session.userIsLogdIn="Mishooo";


  req.getConnection(function(err, connection) {
    if (err) return next(err);
  connection.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
       if (err) throw err;

       connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
            if (err2) throw err2;

  res.render('students',{result : result,result_country : result_country,message : '' , errors : ''})
});
});
// res.end();
});
});



router.post('/add', (req,res)=>{
  console.log("XXXXXXXXXXXXX      "+req.session.userIsLogdIn);
  req.getConnection(function(err, connection) {
    if (err) return next(err);
// req.checkBody
req.checkBody('slelectbootcamp', 'Bootcamp name is required').not().isEmpty();
req.checkBody('stu_name', 'Student Name is required').not().isEmpty();
req.checkBody('stu_birth', 'Birth date is required').not().isEmpty();
req.checkBody('stu_nath', 'Nationality is required').not().isEmpty();

var errors = req.validationErrors();
    if(errors){

      errors.forEach(function( err){
console.log("bbbbbbbbb    cccccccccccc   "+err.msg)
});
      connection.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
           if (err) throw err;

           connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
                if (err2) throw err2;

      // res.render('students',{result : result,result_country : result_country,message : message, errors: errors })

      // console.log(errors);
      // res.end();
      res.render('students',{
          errors: errors,
          message: '',
          result: result,
          result_country: result_country
      });
      res.end();
      });
      });

        };

if(!errors){
  var sql = "INSERT INTO bootcamp_students (stu_name, stu_birth_date,nath_id,phone_num,email,postcode,address,city,card_id,stu_photo_name,bootcamp_id) VALUES ( '" +req.body.stu_name+ "','" +req.body.stu_birth+ "'," +req.body.stu_nath+ ",'" +req.body.stu_phon+ "','" +req.body.stu_email+ "','" +req.body.zip+ "','" +req.body.stu_address+ "','" +req.body.stu_city+ "','" +req.body.stu_card+ "','" +req.body.stu_photo+ "'," +req.body.slelectbootcamp+ "  )";
  // var sql = "INSERT INTO bootcamp_students (stu_name, stu_birth_date,nath_id,phone_num,email,postcode,address,city,card_id,stu_photo_name,bootcamp_id) VALUES ( '" +req.files.stu_name+ "','" +req.files.stu_birth+ "'," +req.files.stu_nath+ ",'" +req.files.stu_phon+ "','" +req.files.stu_email+ "','" +req.files.zip+ "','" +req.files.stu_address+ "','" +req.files.stu_city+ "','" +req.files.stu_card+ "','" +req.files.stu_photo+ "'," +req.files.slelectbootcamp+ "  )";
 connection.query(sql, function (err, result) {
   if (err) throw err;

   message="Student successfully added "
   connection.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
        if (err) throw err;

        connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
             if (err2) throw err2;

   res.render('students',{result : result,result_country : result_country,message : message, errors: errors })
res.end();

   });
 });
});
}
 });

// res.end();
});


module.exports = router

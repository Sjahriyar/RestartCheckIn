const express = require('express')
const session = require('express-session')
const router = express.Router()

var expressValidator = require('express-validator');
var mysql = require('mysql');




router.get('/', (req,res)=>{
  var hour = 3600000


  req.getConnection(function(err, connection) {
    if (err) return next(err);
  connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, result, fields) {
       if (err) throw err;

       connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
            if (err2) throw err2;

  res.render('students',{result : result,result_country : result_country,message : '' , errors : '', currentuser: ''});

});
});
});

});



router.post('/add', (req,res)=>{
  // console.log("XXXXXXXXXXXXX      "+req.session.userIsLogdIn);
  req.getConnection(function(err, connection) {
    if (err) return next(err);
// req.checkBody
req.checkBody('slelectbootcamp', 'Bootcamp name is required').not().isEmpty();
req.checkBody('stu_name', 'Student Name is required').not().isEmpty();
req.checkBody('stu_birth', 'Birth date is required').not().isEmpty();
req.checkBody('stu_nath', 'Nationality is required').not().isEmpty();

req.checkBody('stu_phon', 'Phone # is required').not().isEmpty();
req.checkBody('stu_email', 'Email is required').isEmail();
req.checkBody('zip', 'Post Code is required').not().isEmpty();
req.checkBody('stu_address', 'Address is required').not().isEmpty();
req.checkBody('stu_city', 'City is required').not().isEmpty();


connection.query("SELECT * FROM bootcamp_students where (bootcamp_id= " +req.body.slelectbootcamp+ " and card_id='" +req.body.stu_card+ "') or (email='" +req.body.stu_email+ "')", function (err, stuck, fields) {
     if (err) throw err;
if(stuck==''){

var errors = req.validationErrors();
    if(errors){

      errors.forEach(function( err){

});
      connection.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
           if (err) throw err;

           connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
                if (err2) throw err2;

      // res.render('students',{result : result,result_country : result_country,message : message, errors: errors })

      // console.log(errors);
      // res.end();
      req.flash('info','Student successfully added.')
      res.redirect('back',{
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
 connection.query(sql, function (err, result) {
   if (err) throw err;

   message="Student successfully added "
   connection.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
        if (err) throw err;

        connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
             if (err2) throw err2;

             connection.query("SELECT * FROM bootcamp_students where stu_name= '" +req.body.stu_name+ "' and email='" +req.body.stu_email+ "' order by stu_id desc", function (err, currentuser, fields) {
                  if (err) throw err;
// where stu_name= '" +req.body.stu_name+ "' and email='" +req.body.stu_email+ "'
// console.log(currentuser);
   res.render('students',{result : result,result_country : result_country,message : message, currentuser: currentuser, errors: errors })
res.end();
});
   });
 });
});
};
}
else {


  connection.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
       if (err) throw err;

       connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
            if (err2) throw err2;

    req.flash('info','Student email or card id is already exist .. Please try again');
  res.render('students',{result : result,result_country : result_country,message : '', currentuser: '', errors: errors })
 res.end();
});
});
}
 });


// res.end();
});
});
module.exports = router

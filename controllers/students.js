const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload');
var mysql = require('mysql');
var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "sasa",
      database: "checking_system"
    });


router.get('/', (req,res)=>{
  con.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
       if (err) throw err;

       con.query("SELECT * FROM countries", function (err2, result_country, fields) {
            if (err2) throw err2;

  res.render('students',{result : result,result_country : result_country,message : ''})
});
})
// res.end();
});



router.post('/add', (req,res)=>{
  // var student= {
  //   stu_name: req.body.stu_name,
  //   stu_birth: req.body.stu_birth
  // }
// console.log(student.stu_name);
  //
  // var sql = "INSERT INTO customers (stu_name, stu_birth_date,nath_id,phone_num
  // ,email,postcode,address,city,card_id,bootcamp_id)
  // VALUES ('"&req.body.stu_name&"', '"&req.body.stu_birth&"')";



  var sql = "INSERT INTO bootcamp_students (stu_name, stu_birth_date,nath_id,phone_num,email,postcode,address,city,card_id,stu_photo_name,bootcamp_id) VALUES ( '" +req.body.stu_name+ "','" +req.body.stu_birth+ "'," +req.body.stu_nath+ ",'" +req.body.stu_phon+ "','" +req.body.stu_email+ "','" +req.body.zip+ "','" +req.body.stu_address+ "','" +req.body.stu_city+ "','" +req.body.stu_card+ "','" +req.body.stu_photo+ "'," +req.body.slelectbootcamp+ "  )";
  // var sql = "INSERT INTO bootcamp_students (stu_name, stu_birth_date,nath_id,phone_num,email,postcode,address,city,card_id,stu_photo_name,bootcamp_id) VALUES ( '" +req.files.stu_name+ "','" +req.files.stu_birth+ "'," +req.files.stu_nath+ ",'" +req.files.stu_phon+ "','" +req.files.stu_email+ "','" +req.files.zip+ "','" +req.files.stu_address+ "','" +req.files.stu_city+ "','" +req.files.stu_card+ "','" +req.files.stu_photo+ "'," +req.files.slelectbootcamp+ "  )";
 con.query(sql, function (err, result) {
   if (err) throw err;

   message="Student successfully added "
   con.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM countries", function (err2, result_country, fields) {
             if (err2) throw err2;

   res.render('students',{result : result,result_country : result_country,message : message})
res.end();
   });
   })

 });

// res.end();
});


module.exports = router

const express = require('express')
const router = express.Router()


// get all the students from bootcamp
router.get('/', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next (err)
    connection.query("SELECT * FROM bootcamp_name",
       function (err, result, fields) {
         if (err) throw err;
    res.render('seestudents',{result_bootcamps : result})
})
})
})

router.get('/stu/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next (err)
    connection.query("SELECT * FROM bootcamp_name",
       function (err, result, fields) {
         if (err) throw err;
         connection.query(`SELECT * FROM checking_system.bootcamp_students WHERE bootcamp_id = ${req.params.id}`,
            function (err2, bootcamps, fields) {
              if (err2) throw err2;

    res.render('stutest',{result_bootcamps : result, data: bootcamps})
    })
  })
})


})
// get ones' student data
router.get('/edit/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);
  connection.query(`SELECT * FROM bootcamp_students WHERE stu_id = ${req.params.id}`, function (err, result, fields) {
       if (err) throw err;
       connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
            if (err2) throw err2;
  res.render('edit_student',{result : result, result_country : result_country, message : ''})
      });
    });
  });
});


// update edited student information
router.post('edit/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    let sql = `UPDATE bootcamp_students SET stu_name= '${req.body.stu_name}', stu_birth = '${req.body.stu_birth_date}',
     WHERE stu_id = ${req.params.id}`
 connection.query(sql, function (err, result) {
   if (err) throw err;
   connection.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
        if (err) throw err;
   connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
             if (err2) throw err2;
             });
          });
        });
     });
   });


module.exports = router

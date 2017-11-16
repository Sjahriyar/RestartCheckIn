const express = require('express')
const router = express.Router()


// get all the students from bootcamp
router.get('/', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next (err)
    connection.query("SELECT * FROM bootcamp_name ",
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
         connection.query(`SELECT * FROM checking_system.bootcamp_students WHERE stu_cancel=0 AND bootcamp_id = ${req.params.id}`,
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


// update edited student information and disable student
router.post('/edit/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    if(req.body.updateme != ''){
    let sql = `UPDATE bootcamp_students SET stu_name= '${req.body.stu_name}', stu_birth_date = '${req.body.stu_birth}'  WHERE stu_id = ${req.params.id}`
     connection.query(sql, function (err, result) {
    if (err) throw err;
    connection.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
         if (err) throw err;
    connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
              if (err2) throw err2;
   req.flash('info', `edit done`)
   res.render('rfid');
             });
          });
        })
      }
     });
  });
  router.post('/delete/:id', (req,res)=>{
    req.getConnection(function(err, connection) {
      if (err) return next(err);
    let sql = `UPDATE bootcamp_students SET stu_cancel=1  WHERE stu_id = ${req.params.id}`
     connection.query(sql, function (err, result) {
    if (err) throw err;
   req.flash('info', `student deleted!`)
    res.redirect('back');
  });
  }
  );
});
router.post('/stop/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);
  let sql = `UPDATE bootcamp_students SET stu_stop=1  WHERE stu_id = ${req.params.id}`
   connection.query(sql, function (err, result) {
  if (err) throw err;
 req.flash('info', `student disabled!`)
  res.redirect('back');
});
}
);
});

   // res.render('rfid');
module.exports = router

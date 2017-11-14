const express = require('express')
const router = express.Router()


// get all the students from bootcamp
router.get('/', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next (err)
      let sql = "SELECT * FROM checking_system.bootcamp_students"
      let query = connection.query(sql, (err, result) => {
        if (err) throw err
        res.render('seestudents', {data:result})
        // console.log(result);
    })
  })
})
// get all the students from bootcamp
router.get('/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);

      let sql = `SELECT * FROM bootcamp_name WHERE bootcamp_id = ${req.params.id}`
      let query = connection.query(sql,(err,result)=>{
        if (err) throw err
        console.log(result);
        res.render('seestudents', {data: result})
      })

    });
})

// get student data by student id
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


// edit student information
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

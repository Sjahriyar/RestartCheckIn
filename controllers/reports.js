
const express = require('express')
const router = express.Router()
var dateFormat= require('date-format');

router.get('/',(req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err)
    connection.query(`SELECT * FROM bootcamp_name`, function(err, results, fields){
        if(err) throw err;
         res.render('reports', {data_name: results, data: '' ,dateFormat: dateFormat})
    })
  })
})

router.post('/', (req,res)=>{
  // console.log(req.body.bootcamps);
  req.getConnection(function(err, connection) {
    if (err) return next (err)
    connection.query(`SELECT * FROM bootcamp_name`, function(err, result_name, fields){
        if(err) throw err;
        connection.query(`SELECT stu_name AS sn ,sign_in_date AS sd FROM bootcamp_students  join sign_in_tabel ON  bootcamp_students.stu_id = sign_in_tabel.stu_id WHERE DATE(sign_in_date) >= '${req.body.start_date}' and DATE(sign_in_date) <= '${req.body.end_date}' and bootcamp_students.bootcamp_id = ${req.body.bootcamps}`,
          function (err2, result_student, fields) {
          if (err2) throw err2;
            // console.log(result_student);
            res.render('reports',{data_name: result_name, data: result_student,dateFormat: dateFormat})

          })
        })
      })
    });

module.exports = router

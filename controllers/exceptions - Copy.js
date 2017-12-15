
const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err)
    connection.query(`SELECT * FROM bootcamp_name`, function(err, results, fields){
        if(err) throw err;

         res.render('exceptions', {data_name: results, data: '',msg:'' })
    })
  })
})

router.post('/', (req,res)=>{
  console.log(req.body.bootcamps);
  req.getConnection(function(err, connection) {
    if (err) return next (err)
    connection.query("SELECT * FROM bootcamp_name",
       function (err, result_name, fields) {
         if (err) throw err;
         connection.query(`SELECT * FROM checking_system.bootcamp_students WHERE bootcamp_id = ${req.body.bootcamps}`,
            function (err2, result_student, fields) {
              if (err2) throw err2;

    res.render('exceptions',{data_name: result_name, data: result_student,msg: ''})
    })
  })
  })
})

module.exports = router

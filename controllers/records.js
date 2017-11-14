const express = require('express')
const router = express.Router()

// get signin table by studentid.
router.get('/view/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);
  connection.query(`SELECT * FROM bootcamp_students WHERE stu_id = ${req.params.id}`, function (err, result, fields) {
       if (err) throw err;
       // console.log(req.params.id);
       connection.query(`SELECT * FROM checking_system.sign_in_tabel WHERE stu_id = ${req.params.id}`, function(err1, resdate, fields){
         if (err1) throw err1;

         // console.log(req.params.id);
         res.render('records',{data : result, resdate : resdate, message : '' ,id: req.params.id})
       });
      });
    });
  });

// get signin table by studentid.
router.post('/', (req,res)=>{
      req.getConnection(function(err, connection) {
        if (err) return next(err);
          connection.query(`SELECT * FROM bootcamp_students WHERE stu_id = ${req.body.id}`, function (err, result, fields) {
           if (err) throw err;
              connection.query(`SELECT * FROM sign_in_tabel  WHERE DATE(sign_in_date) >= '${req.body.start_date}' and DATE(sign_in_date) <= '${req.body.end_date}'`, function (err, resdate, fields) {
                  if (err) throw err;
               res.render('records',{data : result,id:1,resdate: resdate})
                   res.end();
          });
        });
        });

      });

  // get signin table by studentid.
  router.post('/show', (req,res)=>{
    console.log(req.body.start_date);

    req.getConnection(function(err, connection) {
      if (err) return next(err);
    connection.query(`SELECT * FROM bootcamp_students WHERE stu_id = ${req.body.id}`, function (err, result, fields) {
         if (err) throw err;
         // console.log(req.params.id);
         connection.query(`SELECT * FROM checking_system.sign_in_tabel WHERE stu_id = ${req.body.id}`, function(err1, result_time, fields){
           if (err1) throw err1;
           connection.query(`SELECT * FROM sign_in_tabel  WHERE DATE(sign_in_date) = '${req.body.start_date}'`, function (err, resdate, fields) {
                if (err) throw err;
             res.render('records',{data : result,id:1, data_time : result_time,resdate: resdate})
                 res.end();
         });
        });
      });
      });

    });

module.exports = router

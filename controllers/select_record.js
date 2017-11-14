const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')

//Get by ID
router.get('/:id', (req,res)=>{
  console.log(req.params.id);
  req.getConnection(function(err, connection) {
    if (err) return next(err);

      let sql = `SELECT * FROM bootcamp_name WHERE bootcamp_id = ${req.params.id}`
      let query = connection.query(sql,(err,result)=>{
        if (err) throw err

        let sql = `SELECT * FROM bootcamp_students WHERE bootcamp_id = ${req.params.id}`
        let query = connection.query(sql,(err,result_student)=>{
          if (err) throw err

        console.log(result);
        res.render('select_record', {data: result, data_student: result_student})
      });
    });

    });
});



module.exports = router

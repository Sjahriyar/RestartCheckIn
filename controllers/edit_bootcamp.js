const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')

//Get by ID
router.get('/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);

      let sql = `SELECT * FROM bootcamp_name WHERE bootcamp_id = ${req.params.id}`
      let query = connection.query(sql,(err,result)=>{
        if (err) throw err
        console.log(result);
        res.render('edit_bootcamp', {data: result})
      })

    });
})

//Edit by ID
router.post('/edit/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);

      let sql = `UPDATE bootcamp_name SET bootcamp_name= '${req.body.bootcamp_name}', start_date = '${req.body.start_date}', end_date = '${req.body.end_date}', slack_link = '${req.body.start_date}' WHERE bootcamp_id = ${req.params.id}`
      let query = connection.query(sql,(err,result)=>{
        if (err) throw err
        console.log(result);
        res.send('updated')
      })

    });
})




module.exports = router

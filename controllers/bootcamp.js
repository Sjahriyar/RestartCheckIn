const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')

//Show the form
router.get('/', (req,res)=>{

  res.render('bootcamp')
})

//Register New Bootcamp
router.post('/add', (req,res)=>{
console.log(req.body.bootcamp_name);
    // req.getConnection(function(err, connection) {
    //   if (err) return next(err);
    //
    //     let bootcamp = {bootcamp_name: '', start_date: '', end_date: '', bootcamp_cancel: '',slack_link:'', login_id:''}
    //     let sql = 'INSERT INTO bootcamp_name SET ?'
    //     let query = connection.query(sql,bootcamp,(err,result)=>{
    //       if (err) throw err
    //       res.send("New Bootcamp Registred Successfully!")
    //     })
    //
    //   });

    })


//Register New Student
router.post('/student/add', (req,res)=>{

})





module.exports = router

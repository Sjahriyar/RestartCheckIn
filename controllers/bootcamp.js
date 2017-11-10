const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')



//Register New Bootcamp
router.post('/bootcamp/add', (req,res)=>{

    req.getConnection(function(err, connection) {
      if (err) return next(err);

        let bootcamp = {bootcamp_name: 'req.body.btname', start_date: '', end_date: '', bootcamp_cancel: '',slack_link:'', login_id:''}
        let sql = 'INSERT INTO bootcamp_name SET ?'
        let query = connection.query(sql,bootcamp,(err,result)=>{
          if (err) throw err
          res.send("New Bootcamp Registred Successfully!")
        })

      });

    })


//Register New Student
router.post('/student/add', (req,res)=>{

})


//Get List of all Students
// router.get('/', (req,res)=>{
//   res.render('../views/index')
// })

//Get student by id
router.get('../views/', (req,res)=>{

})

//Update student by ID
router.put('student/:id', (req,res)=>{

})

//Delete student by id
router.delete('student/:id', (req,res)=>{

})


module.exports = router

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')


//EXAMPLE FOR MYSQL USAGE

// module.exports = function(req, res, next) {
//     ...
//     req.getConnection(function(err, connection) {
//       if (err) return next(err);
//
//       connection.query('SELECT 1 AS RESULT', [], function(err, results) {
//         if (err) return next(err);
//
//         results[0].RESULT;
//         // -> 1
//
//         res.send(200);
//       });
//
//     });
//     ...
// }

//Register New Student
router.post('/student/add', (req,res)=>{

})


//Get List of all Students
router.get('/student/all', (req,res)=>{

})

//Get student by id
router.get('student/:id', (req,res)=>{

})

//Update student by ID
router.put('student/:id', (req,res)=>{

})

//Delete student by id
router.delete('student/:id', (req,res)=>{

})


module.exports = router

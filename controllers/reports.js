const express = require('express')
const router = express.Router()

// router.get('/', (req,res)=>{
//   req.getConnection(function(err, connection) {
//     if (err) return next(err)
//
//       let sql = 'SELECT * FROM checking_system.sign_in_tabel inner join bootcamp_students on  sign_in_tabel.stu_id=bootcamp_students.stu_id where Date(sign_in_date)=Date("2017-11-14")'
//       let query = connection.query(sql,(err,results)=>{
//         if (err) throw err
//         res.render('reports',{data: results})
//       })
//     })
// })

// module.exports = router


//
router.get('/',(req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err)
    connection.query(`SELECT * FROM checking_system.sign_in_tabel inner join bootcamp_students on  sign_in_tabel.stu_id=bootcamp_students.stu_id where Date(sign_in_date)=Date('2017-11-14');`, function (err, result, fields) {
         if (err) throw err;
         res.render('reports', {data: result})
      })
    })
})

module.exports = router
//
// connection.query(`SELECT * FROM checking_system.sign_in_tabel
//                           inner join bootcamp_students
//                           on  sign_in_tabel.stu_id=bootcamp_students.stu_id
//                           where Date(sign_in_date)=Date('2017-11-14');`, function (err, result, fields) {
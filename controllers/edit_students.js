const express = require('express')
const router = express.Router()


// router.get('/', (req,res)=>{
//   app.find({MYSQL QUERY SELECT * FROM checking_system.bootcamp_students
//   } (req,res)=>
// if (err) throw error
//   res.render('edit_students', {students: data})
// )
// })


router.get('/', (req,res)=>{
  res.render('edit_students')
})


module.exports = router

const express = require('express')
const router = express.Router()

<<<<<<< HEAD

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


=======
router.get('/', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next (err)
      let sql = "SELECT * FROM checking_system.bootcamp_students"
      let query = connection.query(sql, (err, result) => {
        if (err) throw err
        res.render('edit_students', {data:result})
        // console.log(result);
    })
  })
})

>>>>>>> Shahriar
module.exports = router

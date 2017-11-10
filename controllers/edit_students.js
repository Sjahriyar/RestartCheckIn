const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
  res.render('edit_students')

  SELECT * FROM checking_system.bootcamp_students;

})



router.put('/', (req,res)=>{
  res.render('edit_students')
})


module.exports = router

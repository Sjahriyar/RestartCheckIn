const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
  res.render('edit_students')
})


module.exports = router
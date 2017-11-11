const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next (err)
      let sql = "SELECT * FROM checking_system.bootcamp_students"
      let query = connection.query(sql, (err, result) => {
        if (err) throw err
        res.render('edit_students', {data:result})
        console.log(result);
    })
  })
})

module.exports = router

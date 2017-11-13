const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')

//Show the form
router.get('/', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err)

      let sql = 'SELECT * FROM bootcamp_name'
      let query = connection.query(sql,(err,results)=>{
        if (err) throw err
        res.render('records',{data: results})
      })
    })
})

module.exports = router

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')


router.get('/', (req,res)=>{
  res.render('index')
})

router.post('/login', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err)

  let sql = `SELECT full_name,email, password FROM login WHERE email = '${req.body.email}' AND  password = '${req.body.password}'`
  // `SELECT 1 FROM login WHERE email = '${req.body.email}' and password = '${req.body.password}'`
  let query = connection.query(sql,(err,results)=>{
    if (err) throw err;
    //Grab only full name with loop and store it to session
    if( results.length > 0){
      for(i=0;i<results.length ; i++){
        var name = results[i].full_name
      }
      req.session.admin = name
      res.redirect('/bootcamp')
    }
    else {
      res.send('does now exist')
    }
  });
})
})

module.exports = router

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')


//Render Index
router.get('/', (req,res)=>{
  res.render('index')
})

//Render Admin Profile Edit
router.get('/profile/:id',(req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);

      let sql = `SELECT * FROM login WHERE login_id = ${req.params.id}`
      let query = connection.query(sql,(err,result)=>{
        if (err) throw err
          // for(i=0;i<result.length ; i++){
          //   var id = result[i].login_id
          // }
          // req.session.prof = id
          res.render('admin_profile', {info: result})
      })

    });
})

router.post('/profile/edit_admin/:id',(req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);

      let sql = `UPDATE login SET full_name= '${req.body.full_name}', email = '${req.body.email}', password = '${req.body.password}' WHERE login_id = ${req.params.id}`
      let query = connection.query(sql,(err,result)=>{
        if (err) throw err
        req.flash('info', `Profile Successfully Edited!`)
        res.redirect('back');
      })

    });
})

//Login Panel
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
      req.flash('danger','User Does not exist!')
    }
  });
})
})

module.exports = router

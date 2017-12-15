const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')
var passwordHash = require('password-hash');
//Render Index
router.get('/', (req,res)=>{
  req.session.destroy();
  res.render('index')
})


//Render Admin Profile Edit
router.get('/profile/:id',(req,res)=>{
  if (!req.session.admin) {
    res.redirect('/')
  }
  else{

  req.getConnection(function(err, connection) {
    if (err) return next(err);

      let sql = `SELECT * FROM login WHERE login_id = ${req.params.id}`
      let query = connection.query(sql,(err,result)=>{
        if (err) throw err
          res.render('admin_profile', {info: result})
      })

    });
  }
})

router.post('/edit/:id',(req,res)=>{
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

  var hashedPassword = passwordHash.generate(req.body.password);
// console.log("ZZZZZZZZZz  ="+hashedPassword);
  var sql = `SELECT full_name,email, password FROM login WHERE email = '${req.body.email}'  `
// AND  password = '${req.body.password}'
  var query = connection.query(sql,(err,results)=>{
    if (err) throw err;

    // if( results.length > 0){
    if( passwordHash.verify(req.body.password,results[0].password)){
      for(i=0;i<results.length ; i++){
        var name = results[i].full_name
      }
      req.session.admin = name;
      req.session.org_pws = req.body.password;
      res.redirect('/bootcamp');
    }
    else {
      req.flash('danger','User Does not exist!')
      res.redirect('/admin');
    }

  });
})
})

module.exports = router

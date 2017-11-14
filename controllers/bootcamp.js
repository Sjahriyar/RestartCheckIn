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
        res.render('bootcamp',{data: results})
      })
    })

})

//Find A bootcamp for edit
router.get('/showbtcmp/:id',(req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);

      let sql = `SELECT * FROM bootcamp_name WHERE bootcamp_id = ${req.params.id}`
      let query = connection.query(sql,(err,result)=>{
        if (err) throw err
        console.log(result);
        res.render('edit_bootcamp', {data: result})
      })

    });
})

//Register New Bootcamp
router.post('/', (req,res)=>{

    req.getConnection(function(err, connection) {
      if (err) return next(err);

        let bootcamp = {bootcamp_name: req.body.bootcamp_name, start_date: req.body.start_date, end_date: req.body.end_date, slack_link: req.body.slack_link}
        let sql = 'INSERT INTO bootcamp_name SET ?'
        let query = connection.query(sql,bootcamp,(err,result)=>{
          if (err) throw err
          req.flash('success', 'Bootcamp successfully registred!')
          res.redirect('back');
        })

      });

    })

    //Edit the bootcamp
    router.post('/editbtcmp/:id', (req,res)=>{
      req.getConnection(function(err, connection) {
        if (err) return next(err);

          let sql = `UPDATE bootcamp_name SET bootcamp_name= '${req.body.bootcamp_name}', start_date = '${req.body.start_date}', end_date = '${req.body.end_date}', slack_link = '${req.body.start_date}' WHERE bootcamp_id = ${req.params.id}`
          let query = connection.query(sql,(err,result)=>{
            if (err) throw err
          })

        });
    })

router.get('/signout',(req,res)=>{
      req.session.destroy();
      res.redirect('/');
  });


module.exports = router

const express = require('express')
const router = express.Router()
const multer = require('multer')
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')
//Multer Setup
const multerConf = {

  storage : multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/bootcamps')
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split('/')[1]
      cb(null, file.fieldname + '-' + req.body.bootcamp_name +'.'+ ext)
    }
  }),
  filefilter: function(req, file, cb){
    if(!file){
      cb()
    }
    const image = file.mimtype.startsWith('image/')
    if(image){
      cb(null,true)
    }else{
      cb({message: "File type not supported"},false)
    }
  }

}
//END OF MULTER SETUP

//Show the form
router.get('/', (req,res)=>{

  req.getConnection(function(err, connection) {
    if (err) return next(err)
      let sql = 'SELECT * FROM bootcamp_name WHERE bootcamp_cancel = 0'
      let query = connection.query(sql,(err,results)=>{
        if (err) throw err
        res.render('bootcamp',{data: results})
      })
    })

})

//Find A bootcamp for edit
router.get('/showbtcmp/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);

      let sql = `SELECT * FROM bootcamp_name WHERE bootcamp_id = ${req.params.id}`
      let query = connection.query(sql,(err,result)=>{
        if (err) throw err
        res.render('edit_bootcamp', {data: result})
      })

    });
})

//Register New Bootcamp
router.post('/', multer(multerConf).single('group_photo'), (req,res)=>{
    req.getConnection(function(err, connection) {
      if (err) return next(err);
      let sql =  `INSERT INTO bootcamp_name (bootcamp_name, start_date, end_date, slack_link, group_photo) values('${req.body.bootcamp_name}','${req.body.start_date}','${req.body.end_date}','${req.body.slack_link}',CASE WHEN group_photo IS 'undefined' THEN "no_photos.jpg" ELSE '${req.file.filename}' END)`
      let query = connection.query(sql,(err)=>{
        if (err) throw err
        req.flash('success', `${req.body.bootcamp_name} is Successfully Registred`)
        res.redirect('back');
        })

      });

    })
    //Edit the bootcamp
    router.post('/editbtcmp/:id', (req,res)=>{
      req.getConnection(function(err, connection) {
        if (err) return next(err);

          let sql = `UPDATE bootcamp_name SET bootcamp_name= '${req.body.bootcamp_name}', start_date = '${req.body.start_date}', end_date = '${req.body.end_date}', slack_link = '${req.body.slack_link}' WHERE bootcamp_id = ${req.params.id}`
          let query = connection.query(sql,(err,result)=>{
            if (err) throw err
            req.flash('info', `Bootcamp Successfully Edited!`)
            res.redirect('back');
          })

        });
    })


//Delete bootcamp
router.post('/delete/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    let sql = `UPDATE bootcamp_name SET bootcamp_cancel= 1 WHERE bootcamp_id = ${req.params.id} ;`
    let query = connection.query(sql,(err,result)=>{
      if (err) throw err
      req.flash('danger', `Bootcamp Successfully Deleted!`)
      res.redirect('/bootcamp');
  })
})
})
//SIGN OUT
router.get('/signout',(req,res)=>{
      req.session.destroy();
      res.redirect('/');
  });


module.exports = router

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const express = require('express')
const session = require('express-session')
const router = express.Router()
var mysql = require('mysql');

router.get('/:id', (req,res)=>{
  res.render('upload',{id: req.params.id})

});



router.get('/studentsAfterrImg', (req,res)=>{

  res.render('upload',{id: req.params.id})

});








router.post('/upload/:id', (req,res)=>{

  req.getConnection(function(err, connection) {
    if (err) return next(err);


  if (req.url == '/upload/'+req.params.id) {

// console.log("xxxxxxx = "+req.params.stupar);

    var form = new formidable.IncomingForm({uploadDir : "."}),
        phtt = 0;

    let myPro = new Promise( function( resolve, reject){

      form.parse(req, function (err, fields, files) {
        var oldpath = files.upload.path;
        var newpath = './public/uploads/' + files.upload.name;

//Update record
var sql = "update  bootcamp_students set stu_photo_name='" +files.upload.name+ "' where stu_id=" +req.params.id+ " ";
connection.query(sql, function (err, result) {
 if (err) throw err;
});
//end of update record


        phtt = files.upload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          resolve(files.upload.name);
        });
      });

    });
    myPro.then( me => {
       req.session.phname=me;
      //
      res.end();
    });
    req.flash('info','Student successfully added ... with photo');
    // res.redirect('back');

res.redirect('/students');


 // res.render('/students');
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="upload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
// });
res.end();

});
});
module.exports = router

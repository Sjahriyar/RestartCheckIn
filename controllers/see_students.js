const express = require('express')
const router = express.Router()
var dateFormat = require('dateformat');

// get all the students from bootcamp
router.get('/', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next (err)
    connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc",
       function (err, result, fields) {
         if (err) throw err;
    res.render('see_students',{bootcamp:result,data:'',stu:'',selstu:''})
    })
  })
})


// get all the students from bootcamp
router.post('/show', (req,res)=>{
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var date = new Date();
            req.getConnection(function(err, connection) {
              if (err) return next(err);



  //XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(req.body.slelectbootcamp=='' ){

          connection.query(`SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0    order by stu_name `, function (err, stu, fields) {
               if (err) throw err;
               // console.log(req.params.id);
               connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                if (err) throw err;

       res.render('see_students',{bootcamp:bootcamp,data:stu,stu:stu,selstu:''})
                      res.end();
               });
               });
             }
  //XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(req.body.slelectstu=='' && req.body.slelectbootcamp!='' ){
              var    sql;

  if(req.body.chkstop==null && req.body.chkdel==null){
 sql="SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = " +req.body.slelectbootcamp+ "   order by stu_name ";
    }
    if(req.body.chkstop!=null && req.body.chkdel==null){
  sql="SELECT * FROM bootcamp_students WHERE  stu_stop=1 and bootcamp_id = " +req.body.slelectbootcamp+ "   order by stu_name ";

      }

      if(req.body.chkstop==null && req.body.chkdel!=null){
    sql="SELECT * FROM bootcamp_students WHERE stu_cancel=1 and bootcamp_id = " +req.body.slelectbootcamp+ "   order by stu_name ";
        }


          connection.query(sql, function (err, stu, fields) {
               if (err) throw err;
               // console.log(req.params.id);
               connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                if (err) throw err;

       res.render('see_students',{bootcamp:bootcamp,data:stu,stu:stu,selstu:''})
                      res.end();
               });
               });
             }
  //XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++
});
})


router.get('/stu/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next (err)
    connection.query("SELECT * FROM bootcamp_name",
       function (err, result, fields) {
         if (err) throw err;
         connection.query(`SELECT * FROM checking_system.bootcamp_students WHERE stu_cancel=0 AND stu_stop=0 AND bootcamp_id = ${req.params.id}`,
            function (err2, bootcamps, fields) {
              if (err2) throw err2;
                res.render('stutest',{result_bootcamps : result, data: bootcamps})
              })
            })
          })
        })
// get ones' student data
router.get('/edit/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);

    connection.query("SELECT * FROM bootcamp_name", function (err, result_boot, fields) {
         if (err) throw err;

  connection.query(`SELECT * FROM bootcamp_students WHERE stu_id = ${req.params.id}`, function (err, result, fields) {
       if (err) throw err;
       connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
            if (err2) throw err2;
  res.render('edit_student',{result : result, result_country : result_country, message : '',result_boot:result_boot})
      });
    });
    });
  });
});


// update edited student information and disable student
router.post('/edit/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    if(req.body.updateme != ''){
      // xax=parseInt(req.body.stu_nath)+15;
// console.log("AAAAAAAAAAAAa "+xax);


     var sql = "UPDATE bootcamp_students SET stu_name= '" +req.body.stu_name+ "',phone_num='" +req.body.stu_phon+ "',email='" +req.body.stu_email+ "', postcode='" +req.body.zip+ "',address='" +req.body.stu_address+ "',city='" +req.body.stu_city+ "',card_id='" +req.body.stu_card+ "', stu_birth_date='" +req.body.stu_birth+ "' ,nath_id=" +parseInt(req.body.stu_nath)+ ",bootcamp_id=" +req.body.slelectbootcamp+ "  WHERE stu_id = " +req.params.id+ " "
     connection.query(sql, function (err, result) {
    if (err) throw err;
    connection.query("SELECT * FROM bootcamp_name", function (err, result, fields) {
         if (err) throw err;
    connection.query("SELECT * FROM countries", function (err2, result_country, fields) {
              if (err2) throw err2;
    req.flash('info', `Student is Edited!`)
   res.redirect('/seestuds/edit/'+req.params.id);

             });
          });
        })
      }
     });
  });

  //Delete Student
  router.post('/delete/:id', (req,res)=>{
    req.getConnection(function(err, connection) {
      if (err) return next(err);
      var now = new Date();
    let sql = "UPDATE bootcamp_students SET stu_cancel=1,stu_cancel_date='" +  dateFormat(now, 'yyyy-mm-dd HH:MM:ss')  + "'  WHERE stu_id =" +req.params.id+ ""
     connection.query(sql, function (err, result) {
    if (err) throw err;
   req.flash('info', `student deleted!`)

   connection.query("SELECT * FROM bootcamp_students WHERE stu_id = " +req.params.id+ "", function (err, rx, fields) {
    if (err) throw err;

   connection.query("SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = " +rx[0].bootcamp_id+ "   order by stu_name ", function (err, stu, fields) {
        if (err) throw err;

        connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
         if (err) throw err;

res.render('see_students',{bootcamp:bootcamp,data:stu,stu:stu,selstu:''})
               res.end();
});
});
});

  });
  }
  );
});
  //XX Delete Student

  //Undo Student
  router.post('/undo/:id', (req,res)=>{
    req.getConnection(function(err, connection) {
      if (err) return next(err);
      var now = new Date();
    let sql = "UPDATE bootcamp_students SET stu_cancel=0,stu_cancel_date='',stu_stop=0,stu_stop_date=''  WHERE stu_id =" +req.params.id+ ""
     connection.query(sql, function (err, result) {
    if (err) throw err;
   req.flash('info', `student Undid!`)

   connection.query("SELECT * FROM bootcamp_students WHERE stu_id = " +req.params.id+ "", function (err, rx, fields) {
    if (err) throw err;

   connection.query("SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = " +rx[0].bootcamp_id+ "   order by stu_name ", function (err, stu, fields) {
        if (err) throw err;

        connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
         if (err) throw err;

res.render('see_students',{bootcamp:bootcamp,data:stu,stu:stu,selstu:''})
               res.end();
});
});
});

  });
  }
  );
});
  //XX Undo Student

router.post('/stop/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var now = new Date();

var sql = "update bootcamp_students set stu_stop=1,stu_stop_reason='" +req.body.stopres+ "',stu_stop_date='" +  dateFormat(now, 'yyyy-mm-dd HH:MM:ss')  + "'  WHERE stu_id =" +req.params.id+ "";
                connection.query(sql, function (err, resultx) {
                  if (err) throw err;


 req.flash('info', `Student stopped!`);
 connection.query("SELECT * FROM bootcamp_students WHERE stu_id = " +req.params.id+ "", function (err, rx, fields) {
  if (err) throw err;

 connection.query("SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = " +rx[0].bootcamp_id+ "   order by stu_name ", function (err, stu, fields) {
      if (err) throw err;
      // console.log(req.params.id);
      connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
       if (err) throw err;

res.render('see_students',{bootcamp:bootcamp,data:stu,stu:stu,selstu:''})
             res.end();
});
});
});
  // res.redirect('back');
});
}
);
});

   // res.render('rfid');
module.exports = router

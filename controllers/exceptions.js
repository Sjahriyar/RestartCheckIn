const express = require('express')
const router = express.Router()
var dateFormat = require('dateformat');
var DateDiff = require('date-diff');
// get signin table by studentid.
router.get('/', (req,res)=>{
  var date = new Date();
      req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
         if (err) throw err;
currentdate=dateFormat(date, "yyyy-mm-dd");
               res.render('exceptions',{bootcamp:bootcamp,stu:'',currentdate:currentdate,todate:'',stu2:'',sign:'',selstu:'',dayloop:'',regsign:''})
               res.end();
        });
        });

      });




        // get signin table by studentid.
        router.post('/show', (req,res)=>{

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
  var date = new Date();
          req.getConnection(function(err, connection) {
            if (err) return next(err);

              if(req.body.slelectbootcamp==''  && req.body.slelectbootcamp=='' ){
                connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                 if (err) throw err;
                currentdate=req.body.fromdate;
                todate=req.body.todate;
                               res.render('exceptions',{bootcamp:bootcamp,stu:'',currentdate:currentdate,todate:todate,stu2:'',sign:'',selstu:'',dayloop:'',regsign:''})
                               res.end();
                });
              }
//XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(req.body.show_reports=='' && req.body.slelectbootcamp!='' ){

          connection.query(`SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = ${req.body.slelectbootcamp}   order by stu_name `, function (err, stu, fields) {
               if (err) throw err;
               // console.log(req.params.id);
               connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                if (err) throw err;
       currentdate=req.body.fromdate;
       todate=req.body.todate;
                      res.render('exceptions',{bootcamp:bootcamp,stu:stu,currentdate:currentdate,todate:todate,stu2:'',sign:'',selstu:'',dayloop:'',regsign:''})
                      res.end();
               });
               });
             }
//XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++ Show Reports of exceptions
             if(req.body.show_reports=='  Show  ' && req.body.slelectbootcamp!='' && req.body.slelectstu!=''){

               var sql = "SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "
 if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
 sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
 }
 sql=sql+"  order by stu_name ";
                  connection.query(sql, function (err, stu2) {
                  if (err) throw err;

                   var sqlx = "SELECT * FROM sign_in_tabel WHERE sign_alarm>0 "
                  var sql = "SELECT * FROM execuse_condithion WHERE execuse_id>0 "
                 if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
                 sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
                 sqlx=sqlx+"  and stu_id = " +req.body.slelectstu+ "";
                 }
                 if(req.body.fromdate!='' && req.body.todate=='' ){
                 sql=sql+"  and date(execuse_date)= '" +  req.body.fromdate  + "'";
                 sqlx=sqlx+"  and date(sign_in_date)= '" +  req.body.fromdate  + "'";
                 }
                 if(req.body.fromdate!='' && req.body.todate!='' ){
                 sql=sql+"  and date(execuse_date)>= '" +  req.body.fromdate  + "'   and date(execuse_date)<= '" +  req.body.todate  + "'";
                 sqlx=sqlx+"  and date(sign_in_date)>= '" +  req.body.fromdate  + "'   and date(sign_in_date)<= '" +  req.body.todate  + "'";
                 }

                sql=sql+"  order by execuse_date ";
                sqlx=sqlx+"  order by sign_in_date ";

                     connection.query(sql, function (err, sign) {
                     if (err) throw err;
                     connection.query(sqlx, function (err, regsign) {
                     if (err) throw err;
             connection.query(`SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = ${req.body.slelectbootcamp}   order by stu_name`, function (err, stu, fields) {
                if (err) throw err;
                // console.log(req.params.id);
                connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                 if (err) throw err;
             currentdate=req.body.fromdate;
             todate=req.body.todate;

             currentdate2=new Date(req.body.fromdate);
             todate2=new Date(req.body.todate);
             var diff = new DateDiff(todate2,currentdate2);

                       res.render('exceptions',{bootcamp:bootcamp,stu:stu,currentdate:currentdate,todate:todate,stu2:stu2,sign:sign,selstu:req.body.slelectstu,dayloop:diff.days(),regsign:regsign})
                       res.end();
                });
                });
                });
                });
                });
              };
//XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++ Show Reports of exceptions





// console.log("AAAAAAAAAA "+req.body.saveme);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++ Save exceptions
             if(req.body.saveme=='  Save exceptions  ' && req.body.slelectbootcamp!='' && req.body.slelectstu!=''){

               var sql = "SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "
 if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
 sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
 }
 sql=sql+"  order by stu_name ";
                  connection.query(sql, function (err, stu2) {
                  if (err) throw err;

             connection.query(`SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = ${req.body.slelectbootcamp}   order by stu_name`, function (err, stu, fields) {
                if (err) throw err;
                // console.log(req.params.id);
                connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                 if (err) throw err;
             currentdate=req.body.fromdate;
             todate=req.body.todate;
dt= new Date(req.body.fromdate);

             currentdate2=new Date(req.body.fromdate);
             if(req.body.todate!=''){
             todate2=new Date(req.body.todate);
           }
           else {
             todate2=new Date(req.body.fromdate);
           }
             var diff = new DateDiff(todate2,currentdate2);


             stu2.forEach(function(rx){
for(j=0;j<=diff.days();j++){
  monvar=dt.getUTCMonth()+1;
hvar="h"+rx.stu_id.toString()+dt.getUTCDate().toString()+monvar.toString()+dt.getUTCFullYear().toString();
chkvar="chk"+rx.stu_id.toString()+dt.getUTCDate().toString()+monvar.toString()+dt.getUTCFullYear().toString();
txtvar="txt"+rx.stu_id.toString()+dt.getUTCDate().toString()+monvar.toString()+dt.getUTCFullYear().toString();

var sql = "delete  from execuse_condithion where stu_id =" + rx.stu_id + " and execuse_date='" + req.sanitize(hvar).trim() + "' limit 100 ";
                connection.query(sql, function (err, rdel) {
                  if (err) throw err;
                });

if(req.sanitize(chkvar).trim() != '' && req.sanitize(chkvar).trim() != null){

                  var sql = "update sign_in_tabel set sign_alarm=0,abs_id=0 where stu_id =" + rx.stu_id + " and date(sign_in_date)='" + req.sanitize(chkvar).trim() + "'  ";
                                  connection.query(sql, function (err, rup) {
                                    if (err) throw err;

                                  });

                  var sql2 = "INSERT INTO execuse_condithion (stu_id,bootcamp_id,execuse_date,execuse_reason) VALUES ( " + rx.stu_id + "," + rx.bootcamp_id + ",'" +req.sanitize(chkvar).trim()+ "','" + req.sanitize(txtvar).trim() + "')";
                                  connection.query(sql2, function (err, rin) {
                                    if (err) throw err;
});


}
dt.setDate(dt.getDate() + 1);

}
dt= new Date(req.body.fromdate);
});


var sqlx = "SELECT * FROM sign_in_tabel WHERE sign_alarm>0 "
var sql = "SELECT * FROM execuse_condithion WHERE execuse_id>0 "
if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
sqlx=sqlx+"  and stu_id = " +req.body.slelectstu+ "";
}
if(req.body.fromdate!='' && req.body.todate=='' ){
sql=sql+"  and date(execuse_date)= '" +  req.body.fromdate  + "'";
sqlx=sqlx+"  and date(sign_in_date)= '" +  req.body.fromdate  + "'";
}
if(req.body.fromdate!='' && req.body.todate!='' ){
sql=sql+"  and date(execuse_date)>= '" +  req.body.fromdate  + "'   and date(execuse_date)<= '" +  req.body.todate  + "'";
sqlx=sqlx+"  and date(sign_in_date)>= '" +  req.body.fromdate  + "'   and date(sign_in_date)<= '" +  req.body.todate  + "'";
}

sql=sql+"  order by execuse_date ";
sqlx=sqlx+"  order by sign_in_date ";
// console.log(sqlx);
   connection.query(sqlx, function (err, regsign) {
   if (err) throw err;
   connection.query(sql, function (err, sign) {
   if (err) throw err;

                       res.render('exceptions',{bootcamp:bootcamp,stu:stu,currentdate:currentdate,todate:todate,stu2:stu2,sign:sign,selstu:req.body.slelectstu,dayloop:diff.days(),regsign:regsign})
                       res.end();
                });
                });
                });
                });
                });
              };
//XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++ Save exceptions




            });

          });




//
//             // get signin table by studentid.
//             router.post('/showstu', (req,res)=>{
//               console.log(req.body.start_date);
//
//               req.getConnection(function(err, connection) {
//                 if (err) return next(err);
//               connection.query(`SELECT * FROM bootcamp_students WHERE stu_id = ${req.body.id}`, function (err, result, fields) {
//                    if (err) throw err;
//                    // console.log(req.params.id);
//                    connection.query(`SELECT * FROM checking_system.sign_in_tabel WHERE stu_id = ${req.body.id}`, function(err1, result_time, fields){
//                      if (err1) throw err1;
//                      connection.query(`SELECT * FROM sign_in_tabel  WHERE DATE(sign_in_date) = '${req.body.start_date}'`, function (err, resdate, fields) {
//                           if (err) throw err;
//                        res.render('exceptions',{data : result,id:1, data_time : result_time,resdate: resdate})
//                            res.end();
//                    });
//                   });
//                 });
//                 });
//
//               });
//
//
// // get signin table by studentid.
// router.get('/view/:id', (req,res)=>{
//   req.getConnection(function(err, connection) {
//     if (err) return next(err);
//   connection.query(`SELECT * FROM bootcamp_students WHERE stu_id = ${req.params.id}`, function (err, result, fields) {
//        if (err) throw err;
//        // console.log(req.params.id);
//        connection.query(`SELECT * FROM checking_system.sign_in_tabel WHERE stu_id = ${req.params.id}`, function(err1, resdate, fields){
//          if (err1) throw err1;
//
//          // console.log(req.params.id);
//          res.render('exceptions',{data : result, resdate : resdate, message : '' ,id: req.params.id})
//        });
//       });
//     });
//   });



module.exports = router

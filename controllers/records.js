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
               res.render('records',{bootcamp:bootcamp,stu:'',currentdate:currentdate,todate:'',stu2:'',sign:'',selstu:'',dayloop:'',chart:'',stusign:''})
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

              if(req.body.slelectbootcamp==''){
                connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                 if (err) throw err;
                currentdate=req.body.fromdate;
                todate=req.body.todate;
                               res.render('records',{bootcamp:bootcamp,stu:'',currentdate:currentdate,todate:todate,stu2:'',sign:'',selstu:'',dayloop:'',chart:'',stusign:''})
                               res.end();
                });
              }
//XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(req.body.show_reports=='' && req.body.show_chart=='' && req.body.show_chart_delay=='' && req.body.slelectbootcamp!='' ){

          connection.query(`SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = ${req.body.slelectbootcamp}   order by stu_name `, function (err, stu, fields) {
               if (err) throw err;

               connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                if (err) throw err;
       currentdate=req.body.fromdate;
       todate=req.body.todate;
                      res.render('records',{bootcamp:bootcamp,stu:stu,currentdate:currentdate,todate:todate,stu2:'',sign:'',selstu:'',dayloop:'',chart:'',stusign:''})
                      res.end();
               });
               });
             }
//XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
             if(req.body.show_reports!='' && req.body.show_reports!=null && req.body.slelectbootcamp!='' && req.body.slelectstu!=''){

               var sql = "SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "
 if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
 sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
 }
 sql=sql+"  order by stu_name ";
                  connection.query(sql, function (err, stu2) {
                  if (err) throw err;


                  var sql = "SELECT * FROM sign_in_tabel WHERE abs_id=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "
                 if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
                 sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
                 }
                 if(req.body.fromdate!='' && req.body.todate=='' ){
                 sql=sql+"  and date(sign_in_date)= '" +  req.body.fromdate  + "'";
                 }
                 if(req.body.fromdate!='' && req.body.todate!='' ){
                 sql=sql+"  and date(sign_in_date)>= '" +  req.body.fromdate  + "'   and date(sign_in_date)<= '" +  req.body.todate  + "'";
                 }
                sql=sql+"  order by sign_id ";
                sqlxx=sql;
                     connection.query(sql, function (err, sign) {
                     if (err) throw err;

             connection.query(`SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = ${req.body.slelectbootcamp}   order by stu_name`, function (err, stu, fields) {
                if (err) throw err;

                connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                 if (err) throw err;
             currentdate=req.body.fromdate;
             todate=req.body.todate;

             currentdate2=new Date(req.body.fromdate);
             todate2=new Date(req.body.todate);
             var diff = new DateDiff(todate2,currentdate2);

                       res.render('records',{bootcamp:bootcamp,stu:stu,currentdate:currentdate,todate:todate,stu2:stu2,sign:sign,selstu:req.body.slelectstu,dayloop:diff.days(),chart:'',stusign:''})
                       res.end();
                });
                });
                });
                });
              };
//XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++.show_chart
             if(req.body.show_chart!='' && req.body.show_chart!=null && req.body.slelectbootcamp!='' && req.body.slelectstu!=''){


               var sql = "SELECT count(*) as countsign,sign_in_date FROM sign_in_tabel WHERE abs_id=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "

              if(req.body.fromdate!='' && req.body.todate=='' ){
              sql=sql+"  and date(sign_in_date)= '" +  req.body.fromdate  + "'";
              diff=1;
              }
              if(req.body.fromdate!='' && req.body.todate!='' ){
                currentdate2=new Date(req.body.fromdate);
                todate2=new Date(req.body.todate);
                var diff = new DateDiff(todate2,currentdate2);

              sql=sql+"  and date(sign_in_date)>= '" +  req.body.fromdate  + "'   and date(sign_in_date)<= '" +  req.body.todate  + "'";
              }
             sql=sql+"   GROUP BY Date(sign_in_date) ";


                  connection.query(sql, function (err, stusign) {
                  if (err) throw err;
                  var sql = "delete  from chart_att limit 100 ";
                                  connection.query(sql, function (err, rdel) {
                                    if (err) throw err;

stusign.forEach(function(res){
  var sql = "INSERT INTO chart_att (stu_count,sign_date) VALUES ( " +res.countsign+ ",'" + dateFormat(res.sign_in_date, 'yyyy-mm-dd') + "')";
     connection.query(sql, function (err, rft) {
     if (err) throw err;
});
});
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
req.getConnection(function(err, connection) {
  if (err) return next(err);
var sql = "SELECT count(*) as countsign,sign_in_date FROM sign_in_tabel WHERE abs_id=1 and bootcamp_id = " +req.body.slelectbootcamp+ " "

if(req.body.fromdate!='' && req.body.todate=='' ){
sql=sql+"  and date(sign_in_date)= '" +  req.body.fromdate  + "'";
diff=1;
}
if(req.body.fromdate!='' && req.body.todate!='' ){
 currentdate2=new Date(req.body.fromdate);
 todate2=new Date(req.body.todate);


sql=sql+"  and date(sign_in_date)>= '" +  req.body.fromdate  + "'   and date(sign_in_date)<= '" +  req.body.todate  + "'";
}
sql=sql+"   GROUP BY Date(sign_in_date) ";


   connection.query(sql, function (err, stusign2) {
   if (err) throw err;



stusign2.forEach(function(res){
  connection.query("SELECT * FROM chart_att where sign_date='" +dateFormat(res.sign_in_date, 'yyyy-mm-dd')+ "'" , function (err, attx) {
  if (err) throw err;
if(attx==''){
var sql = "INSERT INTO chart_att (stu_count,sign_date) VALUES ( 0,'" + dateFormat(res.sign_in_date, 'yyyy-mm-dd') + "')";
connection.query(sql, function (err, rft) {
if (err) throw err;
});
}
});
});
});
});
//XX@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@







               var sql = "SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "
 if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
 sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
 }
 sql=sql+"  order by stu_name ";
                  connection.query(sql, function (err, stu2) {
                  if (err) throw err;


                  var sql = "SELECT * FROM sign_in_tabel WHERE abs_id=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "
                 if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
                 sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
                 }
                 if(req.body.fromdate!='' && req.body.todate=='' ){
                 sql=sql+"  and date(sign_in_date)= '" +  req.body.fromdate  + "'";
                 }
                 if(req.body.fromdate!='' && req.body.todate!='' ){
                 sql=sql+"  and date(sign_in_date)>= '" +  req.body.fromdate  + "'   and date(sign_in_date)<= '" +  req.body.todate  + "'";
                 }
                sql=sql+"  order by sign_id ";
                sqlxx=sql;
                     connection.query(sql, function (err, sign) {
                     if (err) throw err;

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
connection.query("SELECT * FROM chart_att order by sign_date" , function (err, att) {
if (err) throw err;

att.forEach(function(rs){
               var sql = "SELECT count(*) as countstu,stu_cancel_date,stu_stop_date FROM bootcamp_students WHERE  bootcamp_id = " +req.body.slelectbootcamp+ " "
               sql=sql+" and (stu_cancel=0 or (stu_cancel=1 and date(stu_cancel_date)> '" +  rs.sign_date  + "')) and (stu_stop=0 or (stu_stop=1 and date(stu_stop_date)> '" +  rs.sign_date  + "'))";
               sql=sql+"   GROUP BY Date(stu_cancel_date),Date(stu_stop_date) ";
                  connection.query(sql, function (err, studet) {
                  if (err) throw err;
                  totstu=0
 studet.forEach(function(rc){
                     totstu=totstu+rc.countstu
                  var sql = "update chart_att set tot_stu=" +totstu+ " where chart_id=" +rs.chart_id+ " ";
                                connection.query(sql, function (err, resultx) {
                                if (err) throw err;
                                    });
                          });
});
});
});
//XX@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



             connection.query(`SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = ${req.body.slelectbootcamp}   order by stu_name`, function (err, stu, fields) {
                if (err) throw err;

                connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                 if (err) throw err;
             currentdate=req.body.fromdate;
             todate=req.body.todate;

             currentdate2=new Date(req.body.fromdate);
             todate2=new Date(req.body.todate);
             var diff = new DateDiff(todate2,currentdate2);













             connection.query(`SELECT * FROM chart_att   order by sign_date`, function (err, att, fields) {
                if (err) throw err;

                       res.render('records',{bootcamp:bootcamp,stu:stu,currentdate:currentdate,todate:todate,stu2:stu2,sign:sign,selstu:req.body.slelectstu,dayloop:diff.days(),chart:'1',stusign:att})
                       res.end();

                });
                });
              });
              });
            });
            });
              };
//XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++
















//+++++++++++++++++++++++++++++++++++++++++++++++++++++++.show_chart
             if(req.body.show_chart_delay!='' && req.body.show_chart_delay!=null && req.body.slelectbootcamp!='' && req.body.slelectstu!=''){


               var sql = "SELECT count(*) as countsign,sign_in_date FROM sign_in_tabel WHERE abs_id=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "

              if(req.body.fromdate!='' && req.body.todate=='' ){
              sql=sql+"  and date(sign_in_date)= '" +  req.body.fromdate  + "'";
              diff=1;
              }
              if(req.body.fromdate!='' && req.body.todate!='' ){
                sql=sql+"  and date(sign_in_date)>= '" +  req.body.fromdate  + "'   and date(sign_in_date)<= '" +  req.body.todate  + "'";
              }

                sql=sql+"  and time(sign_in_date)<= '09:01'   ";
             sql=sql+"   GROUP BY Date(sign_in_date) ";


                  connection.query(sql, function (err, stusign) {
                  if (err) throw err;
                  var sql = "delete  from chart_att limit 100 ";
                                  connection.query(sql, function (err, rdel) {
                                    if (err) throw err;



stusign.forEach(function(res){

  var sqlc = "SELECT count(*) as countsign,sign_in_date FROM sign_in_tabel WHERE abs_id=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "
  sqlc=sqlc+"  and date(sign_in_date)= '" + dateFormat(res.sign_in_date, 'yyyy-mm-dd') + "'";

  connection.query(sqlc, function (err, totc) {
  if (err) throw err;



  var sql = "INSERT INTO chart_att (stu_count,tot_stu,sign_date) VALUES ( " +res.countsign+ "," +totc[0].countsign+ ",'" + dateFormat(res.sign_in_date, 'yyyy-mm-dd') + "')";
     connection.query(sql, function (err, rft) {
     if (err) throw err;
});
});
});
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
req.getConnection(function(err, connection) {
  if (err) return next(err);
var sql = "SELECT count(*) as countsign,sign_in_date FROM sign_in_tabel WHERE abs_id=1 and bootcamp_id = " +req.body.slelectbootcamp+ " "

if(req.body.fromdate!='' && req.body.todate=='' ){
sql=sql+"  and date(sign_in_date)= '" +  req.body.fromdate  + "'";
diff=1;
}
if(req.body.fromdate!='' && req.body.todate!='' ){
 currentdate2=new Date(req.body.fromdate);
 todate2=new Date(req.body.todate);


sql=sql+"  and date(sign_in_date)>= '" +  req.body.fromdate  + "'   and date(sign_in_date)<= '" +  req.body.todate  + "'";
}

sql=sql+"   GROUP BY Date(sign_in_date) ";





   connection.query(sql, function (err, stusign2) {
   if (err) throw err;



stusign2.forEach(function(res){

  var sqlc = "SELECT count(*) as countsign,sign_in_date FROM sign_in_tabel WHERE abs_id=1 and bootcamp_id = " +req.body.slelectbootcamp+ " "
  sqlc=sqlc+"  and date(sign_in_date)= '" + dateFormat(res.sign_in_date, 'yyyy-mm-dd') + "'";

  connection.query(sqlc, function (err, totc) {
  if (err) throw err;

  connection.query("SELECT * FROM chart_att where sign_date='" +dateFormat(res.sign_in_date, 'yyyy-mm-dd')+ "'" , function (err, attx) {
  if (err) throw err;
if(attx==''){

var sql = "INSERT INTO chart_att (stu_count,tot_stu,sign_date) VALUES ( 0," +totc[0].countsign+ ",'" + dateFormat(res.sign_in_date, 'yyyy-mm-dd') + "')";
connection.query(sql, function (err, rft) {
if (err) throw err;
});
}
});
});



});
});
});
//XX@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@







               var sql = "SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "
 if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
 sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
 }
 sql=sql+"  order by stu_name ";
                  connection.query(sql, function (err, stu2) {
                  if (err) throw err;


                  var sql = "SELECT * FROM sign_in_tabel WHERE abs_id=0 and bootcamp_id = " +req.body.slelectbootcamp+ " "
                 if(req.body.slelectstu!='' && req.body.slelectstu!='0' ){
                 sql=sql+"  and stu_id = " +req.body.slelectstu+ "";
                 }
                 if(req.body.fromdate!='' && req.body.todate=='' ){
                 sql=sql+"  and date(sign_in_date)= '" +  req.body.fromdate  + "'";
                 }
                 if(req.body.fromdate!='' && req.body.todate!='' ){
                 sql=sql+"  and date(sign_in_date)>= '" +  req.body.fromdate  + "'   and date(sign_in_date)<= '" +  req.body.todate  + "'";
                 }
                sql=sql+"  order by sign_id ";
                sqlxx=sql;
                     connection.query(sql, function (err, sign) {
                     if (err) throw err;





             connection.query(`SELECT * FROM bootcamp_students WHERE stu_cancel=0 and stu_stop=0 and bootcamp_id = ${req.body.slelectbootcamp}   order by stu_name`, function (err, stu, fields) {
                if (err) throw err;

                connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc", function (err, bootcamp, fields) {
                 if (err) throw err;
             currentdate=req.body.fromdate;
             todate=req.body.todate;

             currentdate2=new Date(req.body.fromdate);
             todate2=new Date(req.body.todate);
             var diff = new DateDiff(todate2,currentdate2);


             connection.query(`SELECT * FROM chart_att   order by sign_date`, function (err, att, fields) {
                if (err) throw err;

                       res.render('records',{bootcamp:bootcamp,stu:stu,currentdate:currentdate,todate:todate,stu2:stu2,sign:sign,selstu:req.body.slelectstu,dayloop:diff.days(),chart:'2',stusign:att})
                       res.end();

                });
                });
              });
              });
            });
            });
              };
//XX+++++++++++++++++++++++++++++++++++++++++++++++++++++++









            });

          });





            // get signin table by studentid.
            router.post('/showstu', (req,res)=>{


              req.getConnection(function(err, connection) {
                if (err) return next(err);
              connection.query(`SELECT * FROM bootcamp_students WHERE stu_id = ${req.body.id}`, function (err, result, fields) {
                   if (err) throw err;

                   connection.query(`SELECT * FROM checking_system.sign_in_tabel WHERE stu_id = ${req.body.id}`, function(err1, result_time, fields){
                     if (err1) throw err1;
                     connection.query(`SELECT * FROM sign_in_tabel  WHERE DATE(sign_in_date) = '${req.body.start_date}'`, function (err, resdate, fields) {
                          if (err) throw err;
                       res.render('records',{data : result,id:1, data_time : result_time,resdate: resdate,chart:'',stusign:''})
                           res.end();
                   });
                  });
                });
                });

              });


// get signin table by studentid.
router.get('/view/:id', (req,res)=>{
  req.getConnection(function(err, connection) {
    if (err) return next(err);
  connection.query(`SELECT * FROM bootcamp_students WHERE stu_id = ${req.params.id}`, function (err, result, fields) {
       if (err) throw err;

       connection.query(`SELECT * FROM checking_system.sign_in_tabel WHERE stu_id = ${req.params.id}`, function(err1, resdate, fields){
         if (err1) throw err1;

         res.render('records',{data : result, resdate : resdate, message : '' ,id: req.params.id,chart:'',stusign:''})
       });
      });
    });
  });



module.exports = router

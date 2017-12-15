const express = require('express')
const session = require('express-session')
const router = express.Router()

var expressValidator = require('express-validator');
var mysql = require('mysql');
var dateFormat = require('dateformat');
var now = new Date();
var rp = require('request-promise');
var Slack = require('slack-node');

var nodemailer = require('nodemailer');
// var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
var fs = require('fs');
var app2 = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })




router.get('/', (req,res)=>{


var date = new Date();
  // Calculate auto refresh time to send auto message for students after 9:00 am
var current_hour = date.getHours();
var current_min = date.getMinutes();
refresh_endtime=-1
if(9-current_hour>0 && 60-current_min>0)
{
refresh_endtime=  (9-current_hour-1)*60 + 60-current_min
}
if(9-current_hour==0 && 30-current_min>=0)
{
refresh_endtime=   30-current_min
}


if(parseInt(refresh_endtime)<0){

  req.getConnection(function(err, connection) {
     if (err) return next(err);

connection.query("SELECT * FROM sign_in_tabel where abs_id=1  and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "'  ", function (err, ra3, fields) {
     if (err) throw err;

if(ra3==''){

refresh_endtime=-1000;
  res.render('main',{refresh_endtime: refresh_endtime,birth:'',msg:'',signed_stu:''});
}
else {
    res.render('main',{refresh_endtime: refresh_endtime,birth:'',msg:'',signed_stu:''});
}
});
});

}else {

  res.render('main',{refresh_endtime: refresh_endtime,birth:'',msg:'',signed_stu:''});
};

});


router.get('/check', (req,res)=>{

// Calculate auto refresh time to send auto message for students after 9:00 am
var date = new Date();
var current_hour = date.getHours();
var current_min = date.getMinutes();
refresh_endtime=-1
if(9-current_hour>0 && 60-current_min>=0)
{
refresh_endtime=  (9-current_hour-1)*60 + 60-current_min
}
if(9-current_hour==0 && 30-current_min>=0)
{
refresh_endtime=   30-current_min
}

//Send direct message after 9:00 AM
// if(dateFormat(now, "ddd")!= 'Sat' &&  dateFormat(now, "ddd")!= 'Sun' && ((current_hour== 9 && current_min>=30) || (current_hour> 9 && current_min>=0)))
if( dateFormat(now, "ddd")!= 'Sun' && ((current_hour== 9 && current_min>=30) || (current_hour> 9 && current_min>=0)))
{

req.getConnection(function(err, connection) {
   if (err) return next(err);

   var sql = "update check_ok set stu_name='' , stu_photo_name='' ,stu_id=0 , bootcamp_id=0";
                   connection.query(sql, function (err, resultx) {
                     if (err) throw err;
   });

   connection.query("SELECT * FROM bootcamp_name where bootcamp_active=1 order by bootcamp_id desc ", function (err, ra1, fields) {
        if (err) throw err;
if(ra1!=''){

  connection.query("SELECT * FROM bootcamp_students where stu_cancel=0 and stu_stop=0 and bootcamp_id=" +ra1[0].bootcamp_id+ " ", function (err, ra2, fields) {
       if (err) throw err;
       ra2.forEach(function(res){

         connection.query("SELECT * FROM sign_in_tabel where stu_id=" +res.stu_id+ "  and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "'  ", function (err, ra3, fields) {
              if (err) throw err;

 if(ra3==''){

   connection.query("SELECT * FROM execuse_condithion where stu_id=" +res.stu_id+ " and date(execuse_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, rsx, fields) {
      if (err) throw err;
                         if (rsx=='')
                         {
datenow2=dateFormat(now, "yyyy-mm-dd HH:MM:ss");

// var sql = "INSERT INTO sign_in_tabel (stu_id,bootcamp_id,card_id,sign_in_date,sign_alarm,check_message,stu_name,stu_photo_name) VALUES ( " +res.stu_id+ "," +res.bootcamp_id+ ",'" +res.card_id+ "','" + datenow2 + "',1,'Absent','" +res.stu_name+ "','" +res.stu_photo_name+ "')";
var sql = "INSERT INTO sign_in_tabel (stu_id,bootcamp_id,card_id,sign_alarm,check_message,stu_name,stu_photo_name,abs_id) VALUES ( " +res.stu_id+ "," +res.bootcamp_id+ ",'" +res.card_id+ "',1,'Absent','" +res.stu_name+ "','" +res.stu_photo_name+ "',1)";
   connection.query(sql, function (err, rft) {
   if (err) throw err;

   var sql = "update check_ok set stu_name='" +res.stu_name+ "' , stu_photo_name='" +res.stu_photo_name+ "' ,stu_id=" +res.stu_id+ " , bootcamp_id=" +res.bootcamp_id+ " ";
                   connection.query(sql, function (err, resultx) {
                     if (err) throw err;
   });
   //Logic sign_alarm

   // connection.query("SELECT * FROM sign_in_tabel where stu_id=" +res.stu_id+ " and sign_alarm>0 order by sign_id desc", function (err, result4, fields) {
     connection.query("SELECT * FROM sign_in_tabel where stu_id=" +res.stu_id+ "  order by sign_id desc", function (err, result4, fields) {
        if (err) throw err;
        if(result4 != ''){
          i=-1;
          j=0;
     // connection.query("SELECT * FROM sign_in_tabel where stu_id=" +result4[0].stu_id+ " and sign_id< " +result4[0].sign_id+ " order by sign_id desc", function (err, rc, fields) {
     //      if (err) throw err;
     //      if(rc != ''){
            result4.forEach(function(resu){
              j=j+1;
              if(j<=3)
              {
                if(resu.sign_alarm>0 ){
                  i=i+1;
                }

              }
              else {
                return;
              }
     });
// console.log("aaaaaaaaaaaaaaaa   "+   i    +"    "+ res.stu_name);
     if(i==0)  alarm_message_slack="Notice "+res.stu_name+" : You are in cool down period ... *** Restart Network Notification *** "

     if(i==1)  alarm_message_slack="Notice "+res.stu_name+" : Please wash dishes ... *** Restart Network Notification *** "

     if(i==2)  alarm_message_slack="Notice "+res.stu_name+" : Sorry to tell you that you are now out from the program ... *** Restart Network Notification *** "

i=i+1;
                connection.query("update sign_in_tabel set sign_alarm=" + i + ",check_message='" + alarm_message_slack + "', sent_slack=1 where stu_id=" +res.stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, result3, fields) {
                     if (err) throw err;
                 });

     // Send slack Alarm_message
     webhookUri =ra1[0].slack_link;
     slack = new Slack();
     slack.setWebhook(webhookUri);

     slack.webhook({
       channel: "#general",
       username: "webhookbot",
       text: alarm_message_slack,
     }, function(err, response) {
       response.send;
     });

     // Send slack Alarm_message
   }
   });
   // }
   //Logic sign_alarm
  });
}
         });
       }
         });
         });

 });
}
});
});

}
//XXSend direct message after 9:00 AM

  //XX Calculate auto refresh time to send auto message for students after 9:00 am
  res.render('main',{refresh_endtime: refresh_endtime,birth:'',msg:'',signed_stu:''})
});


router.post('/check', (req,res)=>{
var xcond="";


  // Calculate auto refresh time to send auto message for students after 9:00 am
  var date = new Date();
  var current_hour = date.getHours();
  var current_min = date.getMinutes();
  refresh_endtime=-1
  if(9-current_hour>0 && 60-current_min>0)
  {
  refresh_endtime=  (9-current_hour-1)*60 + 60-current_min
  }
  if(9-current_hour==0 && 30-current_min>=0)
  {
  refresh_endtime=   30-current_min
  }
  //XX Calculate auto refresh time to send auto message for students after 9:00 am xx
  passok="";
  alarm_message="";
  req.getConnection(function(err, connection) {
    if (err) return next(err);



            connection.query(`SELECT * FROM birth_date where played =0 order by birth_id desc  `, function (err, birth , fields) {
                  if (err) throw err;

        if(birth!=''){
          var now2 = new Date();

          if(now2.getMinutes()-birth[0].sign_time.getMinutes()>=1 || now2.getMinutes()-birth[0].sign_time.getMinutes()<0 ){
        connection.query(`UPDATE birth_date SET played = 1`, function (err, qq, fields) {
                    if (err) throw err;

                  });
                  passok="1";
                  }

                }
                else {
                passok="1";
                }

if (passok=="1"){


  connection.query("SELECT * FROM bootcamp_name where bootcamp_active=1 ", function (err, rmain, fields) {
       if (err) throw err;

       if(rmain != ''){

   connection.query("SELECT * FROM bootcamp_students where stu_cancel=0 and stu_stop=0 and card_id='" +req.body.cardid+ "'  and bootcamp_id=" +rmain[0].bootcamp_id+ " ", function (err, result, fields) {
        if (err) throw err;
//Alarm_message
if(result == ''){
  alarm_message="Sorry your I D is not registerd in our system, Please do contact with the administrator";
        var sql = "update check_ok set check_ok=2 , check_message='" +alarm_message+ "' ,sound='3'";
                        connection.query(sql, function (err, resultx) {
                          if (err) throw err;
        });
      }
// End Alarm_message

        if(result != ''){

          connection.query("SELECT * FROM bootcamp_name where bootcamp_active=1 and bootcamp_id=" +result[0].bootcamp_id+ "", function (err, result2, fields) {
               if (err) throw err;

               if(result2 != ''){

                 var currtime = new Date(Date.now()).toLocaleString();
  var now = new Date();
                datenow2=dateFormat(now, "yyyy-mm-dd HH:MM:ss");

                connection.query("delete FROM sign_in_tabel where abs_id=1 and stu_id=" +result[0].stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, result3, fields) {
                     if (err) throw err;
                });

                 connection.query("SELECT * FROM sign_in_tabel where stu_id=" +result[0].stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, result3, fields) {
                      if (err) throw err;

                      //Alarm_message
                      if(result3 != ''){
                        xcond="1";
                        // console.log(result[0].stu_id);
                        // console.log(dateFormat(now, 'yyyy-mm-dd'));
                        alarm_message="You have already signed in today, Thank you";
                              var sql = "update check_ok set check_ok=2 , check_message='" +alarm_message+ "' ,sound='2' ";
                              connection.query(sql, function (err, resultx) {
                              if (err) throw err;
                              });
                            }
                      // End Alarm_message

                      if(result3 == ''){
sign_alarm=0;

var now = new Date();
if ((dateFormat(datenow2, "HH") >=9 && dateFormat(datenow2, "mm") >0) || (dateFormat(datenow2, "HH") >9 && dateFormat(datenow2, "mm") >=0))
{
 sign_alarm=1;
}
sound_file="1";
                        if(sign_alarm == 0){

                        alarm_message="Welcome "+result[0].stu_name+" , Happy coading";
                      }
                      else {
                        alarm_message="Welcome "+result[0].stu_name+" , Happy coading, Notice there is a notification sent to the slack, Please check it";
sound_file="4";
                      }

// Check if there is an exexuse condition
connection.query("SELECT * FROM execuse_condithion where stu_id=" +result[0].stu_id+ " and date(execuse_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, rsx, fields) {
     if (err) throw err;
                        if (rsx!='')
                        {
                          sound_file="1";
                         sign_alarm=0;
                         alarm_message="Welcome "+result[0].stu_name+" , Happy coading";
                         connection.query("update sign_in_tabel set sign_alarm=" + sign_alarm + ",check_message='" + alarm_message + "' where stu_id=" +result[0].stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, result3, fields) {
                              if (err) throw err;
                          });
                        }

                             });

                             // var sql = "INSERT INTO sign_in_tabel (stu_id,bootcamp_id,card_id,sign_in_date,sign_alarm,check_message,stu_name,stu_photo_name) VALUES ( " +result[0].stu_id+ "," +result[0].bootcamp_id+ ",'" +req.body.cardid+ "','" + datenow2 + "'," + sign_alarm + ",'" + alarm_message + "','" +result[0].stu_name+ "','" +result[0].stu_photo_name+ "')";
                             var sql = "INSERT INTO sign_in_tabel (stu_id,bootcamp_id,card_id,sign_alarm,check_message,stu_name,stu_photo_name) VALUES ( " +result[0].stu_id+ "," +result[0].bootcamp_id+ ",'" +req.body.cardid+ "'," + sign_alarm + ",'" + alarm_message + "','" +result[0].stu_name+ "','" +result[0].stu_photo_name+ "')";
                connection.query(sql, function (err, result0) {
                  if (err) throw err;

                  var sql = "update check_ok set stu_name='" +result[0].stu_name+ "' , stu_photo_name='" +result[0].stu_photo_name+ "' ,stu_id=" +result[0].stu_id+ " , bootcamp_id=" +result[0].bootcamp_id+ " ";
                                  connection.query(sql, function (err, resultx) {
                                    if (err) throw err;
                  });

                  //Alarm_message
                  if(result0 != ''){
                      xcond="1";
                      var sql = "update check_ok set check_ok=1 , check_message='" +alarm_message+ "', sound='" +sound_file+ "'";
                      connection.query(sql, function (err, resultx) {
                      if (err) throw err;
                          });
                        }
                  // End Alarm_message

              //Birthday celebration
              cuurentday=dateFormat(now, "yyyy-mm-dd");
              cuurentday2=dateFormat(now, "mm-dd");
              stu_birth_day=dateFormat(result[0].stu_birth_date, "mm-dd");

              if(cuurentday2==stu_birth_day){

                var sql = "delete  from birth_date where stu_birth_date <> '" + cuurentday + "' limit 100 ";
                                connection.query(sql, function (err, rdel) {
                                  if (err) throw err;

                                var sql = "INSERT INTO birth_date (stu_birth_date,stu_name) VALUES ( '" + cuurentday + "','" +result[0].stu_name+ "')";
                                                connection.query(sql, function (err, rin) {
                                                  if (err) throw err;
                                });
              });
              }
              //XX Birthday celebration


              //XXXXXXXXXXXXXX Condition only for weekend
              if(dateFormat(now, "ddd")== 'Sun')
              {
                alarm_message="Welcome "+result[0].stu_name+" you are just checked in but there is no registration action in the week end, Happy coading";
                connection.query("delete from sign_in_tabel  where stu_id=" +result[0].stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, rup, fields) {
                     if (err) throw err;
              });
                     var sql = "update check_ok set check_ok=1 , check_message='" +alarm_message+ "', sound='1'";
                                   connection.query(sql, function (err, resultx) {
                                   if (err) throw err;
                                       });
              }
              //AA XXXXXXXXXXXXXX Condition only for weekend


//Logic sign_alarm
// if(sign_alarm > 0 && dateFormat(now, "ddd")!= 'Sat' &&  dateFormat(now, "ddd")!= 'Sun')
if(sign_alarm > 0 &&  dateFormat(now, "ddd")!= 'Sun')
{

connection.query("SELECT * FROM sign_in_tabel where stu_id=" +result[0].stu_id+ " and sign_alarm>0 order by sign_id desc", function (err, result4, fields) {
     if (err) throw err;
     if(result4 != ''){
i=0;
j=0;
alarm_message_slack="";

  connection.query("SELECT * FROM sign_in_tabel where stu_id=" +result[0].stu_id+ " and sign_id<= " +result4[0].sign_id+ " order by sign_id desc", function (err, rc, fields) {
       if (err) throw err;
       if(rc != ''){
         rc.forEach(function(res){
           j=j+1;
           if(j<=3)
           {
             if(res.sign_alarm>0){
               i=i+1;
             }

           }
           else {
             return;
           }
  });
  if(i==1)
  {
    alarm_message_slack="Notice "+result[0].stu_name+" : You are in cool down period ... *** Restart Network Notification *** "
i=1;
  }
  if(i==2)  alarm_message_slack="Notice "+result[0].stu_name+" : Please wash dishes ... *** Restart Network Notification *** "

  if(i>2)  alarm_message_slack="Notice "+result[0].stu_name+" : Sorry to tell you that you are now out from the program ... *** Restart Network Notification *** "

             connection.query("update sign_in_tabel set sign_alarm=" + i + ",check_message='" + alarm_message_slack + "', sent_slack=1 where stu_id=" +result[0].stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, result3, fields) {
                  if (err) throw err;
              });
}

else{
if(i==1)  {
  alarm_message_slack="Notice "+result[0].stu_name+" : You are in cool down period ... *** Restart Network Notification *** "
i=1;
}
           connection.query("update sign_in_tabel set sign_alarm=" + i + ",check_message='" + alarm_message_slack + "', sent_slack=1 where stu_id=" +result[0].stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, result3, fields) {
                if (err) throw err;
            });
}




connection.query("SELECT * FROM login where login_id=1 ", function (err, rlog, fields) {
     if (err) throw err;
     if(rlog != ''){

//++++++++++++++++++++++++++++ Send alarm e-mail to master e-mail for who reach wash dishes
       connection.query("SELECT * FROM sign_in_tabel  order by sign_id desc", function (err, remailmaster, fields) {
            if (err) throw err;
            if(remailmaster != ''){
               if(remailmaster[0].sign_alarm>1){
if(remailmaster[0].sign_alarm==2){
scond=" Wash dishes";
}
if(remailmaster[0].sign_alarm>=3){
scond=" Out from the program";
}
var dataz = fs.readFileSync('node_modules/.bin/win.bat', 'utf8')

                 var transporter = nodemailer.createTransport({
                   service: 'gmail',
                   auth: {
                     user: rlog[0].email,
                     pass: dataz.trim()
                   }
                 });


                 var mailOptions = {
                   from: rlog[0].email,
                   to: rlog[0].email,
                   subject: '*** Alarm message student in  '+scond,
                   text: alarm_message_slack
                 };

                 transporter.sendMail(mailOptions, function(error, info){
                   if (error) {
                     // console.log(error);
                   } else {
                      // console.log('Alarm Email sent: ' + info.response);
                   }
                 });


               }
            }
          });
//XX++++++++++++++++++++++++++++ Send alarm e-mail to master e-mail for who reach wash dishes



    var dataz = fs.readFileSync('node_modules/.bin/win.bat', 'utf8');
var transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user: rlog[0].email,
    pass: dataz.trim()
  }
// });
});


var mailOptions = {
  from: rlog[0].email,
  to: result[0].email,
  subject: '*** Restart Network Notification ***',
  text: alarm_message_slack
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    // console.log(error);
  } else {
    // console.log('Email sent: ' + info.response);
  }
});
}
});

// Send slack Alarm_message
webhookUri =result2[0].slack_link;
// console.log(alarm_message_slack);

slack = new Slack();
slack.setWebhook(webhookUri);

slack.webhook({
  channel: "#general",
  username: "webhookbot",
  text: alarm_message_slack,
}, function(err, response) {
  response.send;
});

// Send slack Alarm_message

});
}
});
}
//Logic sign_alarm
});
}

});
}
});
}

});


};
});


};
});
res.render('main',{refresh_endtime: '',birth:'',msg:'ok',signed_stu:''});

});

});



router.post('/check_get', (req,res)=>{

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  req.getConnection(function(err, connection) {

    var date = new Date();
    var current_hour = date.getHours();
    var current_min = date.getMinutes();
    refresh_endtime=-1
    if(9-current_hour>0 && 60-current_min>0)
    {
    refresh_endtime=  (9-current_hour-1)*60 + 60-current_min
    }
    if(9-current_hour==0 && 30-current_min>=0)
    {
    refresh_endtime=   30-current_min
    }
    //XX Calculate auto refresh time to send auto message for students after 9:00 am

    alarm_message="";

    if (err) return next(err)
    connection.query("SELECT * FROM bootcamp_name where bootcamp_active=1 order by bootcamp_id desc ", function (err, ra1, fields) {
         if (err) throw err;
   if(ra1!=''){

    connection.query("SELECT * FROM sign_in_tabel where  date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' and abs_id=0  and bootcamp_id=" +ra1[0].bootcamp_id+ " ", function (err, signed_stu, fields) {
         if (err) throw err;


        connection.query(`SELECT * FROM birth_date where played =0 order by birth_id desc  `, function (err, birth , fields) {
              if (err) throw err;

              connection.query(`SELECT * FROM check_ok `, function (err, msg, fields) {
                   if (err) throw err;

    res.render('main',{refresh_endtime: refresh_endtime,birth:birth,msg:msg,signed_stu:signed_stu});
    if(birth!=''){
      var now2 = new Date();
      // console.log("Now="+now2.getMinutes());
      // console.log("Sign="+birth[0].sign_time.getMinutes());
      if(now2.getMinutes()-birth[0].sign_time.getMinutes()>=1 || now2.getMinutes()-birth[0].sign_time.getMinutes()<0 ){
    connection.query(`UPDATE birth_date SET played = 1`, function (err, qq, fields) {
                if (err) throw err;
              });
              }
            }

    res.end();
    });
    });
    });
  };
    });

  //XX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
});
});

module.exports = router

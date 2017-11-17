const express = require('express')
const session = require('express-session')
const router = express.Router()

var expressValidator = require('express-validator');
var mysql = require('mysql');
var dateFormat = require('dateformat');
var now = new Date();
var rp = require('request-promise');
var Slack = require('slack-node');


// var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
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
  //XX Calculate auto refresh time to send auto message for students after 9:00 am
  res.render('main',{refresh_endtime: refresh_endtime})
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
if(dateFormat(now, "ddd")!= 'Sat' &&  dateFormat(now, "ddd")!= 'Sun' && ((current_hour== 9 && current_min>=30) || (current_hour> 9 && current_min>=0)))
{

req.getConnection(function(err, connection) {
   if (err) return next(err);


   connection.query("SELECT * FROM bootcamp_name order by bootcamp_id desc ", function (err, ra1, fields) {
        if (err) throw err;


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

datenow2=dateFormat(now, "yyyy-mm-dd HH:mm:ss");

 var sql = "INSERT INTO sign_in_tabel (stu_id,bootcamp_id,card_id,sign_in_date,sign_alarm,check_message) VALUES ( " +res.stu_id+ "," +res.bootcamp_id+ ",'----','" + datenow2 + "',1,'Absent')";
   connection.query(sql, function (err, rft) {
   if (err) throw err;


   //Logic sign_alarm

   connection.query("SELECT * FROM sign_in_tabel where stu_id=" +res.stu_id+ " and sign_alarm>0 order by sign_id desc", function (err, result4, fields) {
        if (err) throw err;
        if(result4 != ''){
   i=0;
   j=0;
     connection.query("SELECT * FROM sign_in_tabel where stu_id=" +res.stu_id+ " and sign_id< " +result4[0].sign_id+ " order by sign_id desc", function (err, rc, fields) {
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

   if(i==0)  alarm_message_slack="Notice "+res.stu_name+" : You are in cool down period ... *** Restart Network Notification *** "

   if(i==1)  alarm_message_slack="Notice "+res.stu_name+" : Please wash dishes ... *** Restart Network Notification *** "

   if(i==2)  alarm_message_slack="Notice "+res.stu_name+" : Sorry to tell you that you are now out from the program ... *** Restart Network Notification *** "

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
});
});
}
//XXSend direct message after 9:00 AM


  //XX Calculate auto refresh time to send auto message for students after 9:00 am
  res.render('main',{refresh_endtime: refresh_endtime})
});


router.post('/check', (req,res)=>{

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
  //XX Calculate auto refresh time to send auto message for students after 9:00 am

  alarm_message="";
  req.getConnection(function(err, connection) {
    if (err) return next(err);
   connection.query("SELECT * FROM bootcamp_students where card_id='" +req.body.cardid+ "'", function (err, result, fields) {
        if (err) throw err;
//Alarm_message
if(result == ''){
  alarm_message="Sorry your id is not registerd in our system ... Please do contact with the administrator";
        var sql = "update check_ok set check_ok=2 , check_message='" +alarm_message+ "'";
                        connection.query(sql, function (err, resultx) {
                          if (err) throw err;
        });
      }
// End Alarm_message

        if(result != ''){

          connection.query("SELECT * FROM bootcamp_name where bootcamp_id=" +result[0].bootcamp_id+ "", function (err, result2, fields) {
               if (err) throw err;

               if(result2 != ''){

                 var currtime = new Date(Date.now()).toLocaleString();

                datenow2=dateFormat(now, "yyyy-mm-dd HH:mm:ss");

                 connection.query("SELECT * FROM sign_in_tabel where stu_id=" +result[0].stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, result3, fields) {
                      if (err) throw err;

                      //Alarm_message
                      if(result3 != ''){
                        alarm_message="You are already checked in today ... Thank you";
                              var sql = "update check_ok set check_ok=2 , check_message='" +alarm_message+ "'";
                              connection.query(sql, function (err, resultx) {
                              if (err) throw err;
                              });
                            }
                      // End Alarm_message



                      if(result3 == ''){
sign_alarm=0;


if ((dateFormat(datenow2, "HH") >=9 && dateFormat(datenow2, "mm") >0) || (dateFormat(datenow2, "HH") >9 && dateFormat(datenow2, "mm") >=0))
{
 sign_alarm=1;
}
                        if(sign_alarm == 0){
                        alarm_message="Thank you for check in "+result[0].stu_name+" Happy coading";
                      }
                      else {
                        alarm_message="Thank you for check in "+result[0].stu_name+" Happy coading ... Notice there is a notification message sent now to the slack ... Please check it";
                      }

// Check if there is an exexuse condition
connection.query("SELECT * FROM execuse_condithion where stu_id=" +result[0].stu_id+ " and date(execuse_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, rsx, fields) {
     if (err) throw err;
                        if (rsx!='')
                        {
                         sign_alarm=0;
                         alarm_message="Thank you for check in "+result[0].stu_name+" Happy coading";
                         connection.query("update sign_in_tabel set sign_alarm=" + sign_alarm + ",check_message='" + alarm_message + "' where stu_id=" +result[0].stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, result3, fields) {
                              if (err) throw err;
                          });
                        }

                             });

var sql = "INSERT INTO sign_in_tabel (stu_id,bootcamp_id,card_id,sign_in_date,sign_alarm,check_message) VALUES ( " +result[0].stu_id+ "," +result[0].bootcamp_id+ ",'" +req.body.cardid+ "','" + datenow2 + "'," + sign_alarm + ",'" + alarm_message + "')";
                connection.query(sql, function (err, result0) {
                  if (err) throw err;

                  //Alarm_message
                  if(result0 != ''){
                      var sql = "update check_ok set check_ok=1 , check_message='" +alarm_message+ "'";
                      connection.query(sql, function (err, resultx) {
                      if (err) throw err;
                          });
                        }
                  // End Alarm_message

//Logic sign_alarm
if(sign_alarm > 0 && dateFormat(now, "ddd")!= 'Sat' &&  dateFormat(now, "ddd")!= 'Sun')
{

connection.query("SELECT * FROM sign_in_tabel where stu_id=" +result[0].stu_id+ " and sign_alarm>0 order by sign_id desc", function (err, result4, fields) {
     if (err) throw err;
     if(result4 != ''){
i=0;
j=0;
  connection.query("SELECT * FROM sign_in_tabel where stu_id=" +result[0].stu_id+ " and sign_id< " +result4[0].sign_id+ " order by sign_id desc", function (err, rc, fields) {
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

if(i==0)  alarm_message_slack="Notice "+result[0].stu_name+" : You are in cool down period ... *** Restart Network Notification *** "

if(i==1)  alarm_message_slack="Notice "+result[0].stu_name+" : Please wash dishes ... *** Restart Network Notification *** "

if(i==2)  alarm_message_slack="Notice "+result[0].stu_name+" : Sorry to tell you that you are now out from the program ... *** Restart Network Notification *** "

           connection.query("update sign_in_tabel set sign_alarm=" + i + ",check_message='" + alarm_message_slack + "', sent_slack=1 where stu_id=" +result[0].stu_id+ " and date(sign_in_date)= '" +  dateFormat(now, 'yyyy-mm-dd')  + "' ", function (err, result3, fields) {
                if (err) throw err;
            });

// Send slack Alarm_message
webhookUri =result2[0].slack_link;
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
});
  res.render('main',{refresh_endtime: refresh_endtime})
res.end();
});


module.exports = router

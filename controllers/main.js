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

  res.render('main')

});



router.post('/check', (req,res)=>{
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
                 // console.log("AADDDDZZZZZZZZZZ NOW     "+Date(currtime,'T'));
                 // console.log("AADDDDZZZZZZZZZZ NOW22222222     "+dateFormat(now, "dd-mm-yyyy") );

                 // res.end();
// console.log("AADDDD      "+DATE_FORMAT(currtime, "%D"));
// datenow=dateFormat(now, "dd-mm-yyyy hh:mm:ss");
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
                        if ((dateFormat(datenow2, "HH") >=9 && dateFormat(datenow2, "mm") >0) || (dateFormat(datenow2, "HH") >9 && dateFormat(datenow2, "mm") >=0))  {
                         sign_alarm=1;
                          // console.log("You are late      "+result[0].stu_id+"   "+datenow);
                        }
                        if(sign_alarm==0){
                        alarm_message="Thank you for check in "+result[0].stu_name+" Happy coading";
                      }
                      else {
                        alarm_message="Thank you for check in "+result[0].stu_name+" Happy coading ... Notice there is a notification message sent now to the slack ... Please check it";
                      }


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
if(sign_alarm==1){
connection.query("SELECT * FROM sign_in_tabel where stu_id=" +result[0].stu_id+ " and sign_alarm= 1 order by sign_in desc", function (err, result4, fields) {
     if (err) throw err;
     if(result4 != ''){


// Send slack Alarm_message
// webhookUri = "https://hooks.slack.com/services/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";
webhookUri =result2[0].slack_link;
slack = new Slack();
slack.setWebhook(webhookUri);

slack.webhook({
  channel: "#general",
  username: "webhookbot",
  text: alarm_message,
}, function(err, response) {
  response.send;
});
// Send slack Alarm_message
}
});
}
//Logic sign_alarm



});
}
else {
  {




    console.log("Record is exist      ");
  }
}

});
}
});

}
});
});
  res.render('main')
res.end();
});


module.exports = router

const express = require('express')
const session = require('express-session')
const router = express.Router()

var expressValidator = require('express-validator');
var mysql = require('mysql');
var dateFormat = require('dateformat');
var now = new Date();
var rp = require('request-promise');
var nodemailer = require('nodemailer');
var request = require('request')
var bodyParser = require('body-parser')

router.get('/', (req,res)=>{


      res.render('chart',{msg: msg});


});
module.exports = router

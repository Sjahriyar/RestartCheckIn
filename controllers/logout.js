const express = require('express')
const router = express.Router()
// const multer = require('multer')
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')

//Show the form
router.get('/', (req,res)=>{
  req.session.destroy();
  res.redirect('/admin');
});


module.exports = router

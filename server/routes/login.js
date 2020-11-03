var express = require('express');
var router = express.Router();
//const { parse } = require('querystring');

////////import js//////
const functions = require('../public/javascripts/functions');
///////database//////
var mongoUtil = require( '../public/javascripts/mongoDbUtil' );




/* POST login page. */
router.post('/', function(req, res, next) {
   var body="";
   req.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  }); 
  req.on('end', () => {
   //console.log("body  "+body);
   var json = JSON.parse(body)
   console.log("json: "+JSON.stringify(json));
   
   //chiamare il db
   var db = mongoUtil.getDb();
   functions.findUser(json.email, json.password,db, res);
   
  // res.json(json);
  // res.end('ok', json);
 }); 

});


module.exports = router;

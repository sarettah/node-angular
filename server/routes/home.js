var express = require('express');
var router = express.Router();

const functions = require('../public/javascripts/functions');
var mongoUtil = require( '../public/javascripts/mongoDbUtil' );



/* GET todo list listening.*/
router.get('/', function(req, res, next) {
   //chiamare il db
   var db = mongoUtil.getDb();
  functions.getList(db, res);
});
 


module.exports = router;

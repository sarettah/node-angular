var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



var mongoUtil = require( '../public/javascripts/mongoDbUtil' );
mongoUtil.connectToServer( function( err, client ) {
  console.log("connectToServer")
  if (err) console.log(err);
  // start the rest of your app here

  
} );

module.exports = router;

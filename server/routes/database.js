var express = require('express');
var router = express.Router();
//const { parse } = require('querystring');

/* POST login page. */
router.post('/', function(req, res, next) {
   var body="";
   req.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  }); 
  req.on('end', () => {
   //console.log("body  "+body);
   var json = JSON.parse(body)
   console.log("body: "+body)
   console.log("json: "+JSON.stringify(json));
   console.log("email: "+json.email)
   
   //chiamare il db


   res.send(JSON.stringify(json));
   res.end('ok');
 }); 

});

module.exports = router;

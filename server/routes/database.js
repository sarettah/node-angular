var express = require('express');
var router = express.Router();
//const { parse } = require('querystring');

////////import js//////
const functions = require('../public/javascripts/functions');
///////database//////
const {MongoClient} = require('mongodb');
const url = "mongodb+srv://sarah:sarah@cluster0.so4te.gcp.mongodb.net/ToDo?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let db;
// connect to the db and start the express server
client.connect().then(function(){
  console.log('Apro connessione');
  db = client.db("ToDo");
  // start the express web server listening on localhost:3000
 /* app.listen(port, () => {
     console.log('listening on '+ hostname+':'+port);
   });*/
}).catch(err => {
  console.log("errore: "+err);
});





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
   functions.findUser(json.email, json.password,db, res);
   
  // res.json(json);
  // res.end('ok', json);
 }); 

});

module.exports = router;

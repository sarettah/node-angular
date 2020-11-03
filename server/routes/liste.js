var express = require('express');
var router = express.Router();

const functions = require('../public/javascripts/functions');
var mongoUtil = require( '../public/javascripts/mongoDbUtil' );



/* GET  liste listening.*/
router.get('/', function(req, res, next) {
   //chiamare il db
   var db = mongoUtil.getDb();
   
   if(idCurrentUser !==null){
         try {          
             console.log("cerco le liste in db per utente "+idCurrentUser);
             const query = {  idUser: idCurrentUser.toString() };
             const projection = { _id: 1, idUser:1, liste: 1 };
             db.collection('liste').find(query)//, { projection: projection } )
             .toArray(function(err, result) {
               if (err) throw err;
               //console.log(result[0])
               var liste = [] = result;
               if(liste == null && liste.length===0 ){

                  res.ok = false;
                  //res.json({'email':"non ho trovato l'utente"});
                  res.status(400);
                  res.end();
                  console.log("non ho trovato liste");

               }else{
              
                  console.log("result "+liste.length);
                  res.json({"liste":liste.liste});
                  res.end('ok');
                 
               }
            })
         } catch (e) {
             console.error(e);
         } 
   }else{
      console.log("id vuoto")
      res.send("id vuoto")
   }
});
 


module.exports = router;

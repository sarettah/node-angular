var express = require('express');
var router = express.Router();

const functions = require('../public/javascripts/functions');
var mongoUtil = require( '../public/javascripts/mongoDbUtil' );


/* POST azioni sui todo */
router.post('/', function(req, res, next) {
   var body="";
   req.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  }); 
  req.on('end', () => {
   //console.log("body  "+body);
   var json = JSON.parse(body)
   console.log("json: "+JSON.stringify(json));
   
   var db = mongoUtil.getDb();
   if(json.azione === "elimina"){
      //chiamare il db
      functions.eliminaTodo(json.id, db, res)
   }
   if(json.azione === "aggiungi"){
      //chiamare il db
      functions.aggiungiTodo(json.id,json.titolo, json.descrizione, json.tipoLista, db, res)
   }
   if(json.azione === "modifica"){
      //chiamare il db
      functions.modificaTodo(json.id,json.titolo, json.descrizione,json.tipoLista, db, res)
   }
   if(json.azione === "addLista"){
      //chiamare il db
      functions.addLista(json.id,json.listaNuova,  db, res)
   }
   if(json.azione === "deleteLista"){
      //chiamare il db
      functions.deleteLista(json.id,json.listaEliminata,  db, res)
   }
 }); 

});

/* POST azioni sui todo
router.post('/', function(req, res, next) {
   var json = JSON.parse(body)
   console.log("json: "+JSON.stringify(json));

   //prendere l'azione
   if(json.azione === "elimina"){
      //chiamare il db
      console.log("ELIMINA id: "+json.id);
      functions.eliminaTodo(json.id,db, res);
   }
  
 });
*/

module.exports = router;

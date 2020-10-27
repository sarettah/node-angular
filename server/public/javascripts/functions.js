const { ObjectID } = require('mongodb');
const path = require('path');
var idCurrentUser;


async function findUser( email, password, db, res) {
   if(email !==null && email !== "" && password !==null && password !== ""){
         console.log("campi validi")
         try {          
             console.log("cerco user in db");
             const query = {  email: email, password: password };
             const projection = { _id: 1, nome: 1 , liste:1};
             db.collection('users').find(query, { projection: projection } )
             .toArray(function(err, result) {
               if (err) throw err;
               //console.log(result[0])
               if(typeof result[0] === 'undefined' ){
                  res.ok = false;
                  //res.json({'email':"non ho trovato l'utente"});
                  res.status(400);
                  res.end();
                  console.log("non ho trovato l'utente");
               }else{
                  var id = result[0]._id;
                  idCurrentUser = id;
                  var nome = result[0].nome;//result.projection.nome;
                  var liste = result[0].liste;
                  //console.log("result: nome "+nome+ " + id "+id);
                  currentUser = {id: id.toString(), nome:nome, email:email, password:password, liste:liste};
                  console.log("currentUser: "+ JSON.stringify(currentUser));
                  res.json(currentUser);
                  res.end('ok', currentUser);
                 
               }
            })
         } catch (e) {
             console.error(e);
         } 
   }else{
      res.send("email o password vuoti")
   }
}


async function getList( db, res) {
   if(idCurrentUser !==null){
         try {          
             console.log("cerco lista todo in db per utente "+idCurrentUser);
             const query = {  idUser: idCurrentUser.toString() };
             const projection = { _id: 1, idUser:1, titolo: 1, note:1, checked:1 };
             db.collection('note').find(query).sort({ data: -1 })//, { projection: projection } )
             .toArray(function(err, result) {
               if (err) throw err;
               //console.log(result[0])
               var notes = [] = result;
               if(notes == null && notes.length===0 ){

                  res.ok = false;
                  //res.json({'email':"non ho trovato l'utente"});
                  res.status(400);
                  res.end();
                  console.log("non ho trovato impegni");

               }else{
              
                  console.log("result "+notes.length);
                  res.json({"notes":notes});
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
}

async function eliminaTodo(id, db, res){
   console.log("elimina funcions");
   db.collection('note').deleteOne({ _id: ObjectID(id) });
   //res.redirect('/home');
   res.end('ok');
}

async function aggiungiTodo(id, titolo, descrizione,tipoLista,data, db, res){
   console.log("aggiungi funcions");
   if(titolo === null || titolo === "")
     res.end("bisogna inserire il titolo");
   else{
     db.collection('note').insertOne({
       titolo: titolo,
       idUser: id,
       note: descrizione,
       lista: tipoLista,
       data: data,
       checked: false
     }).then(function(){
       res.redirect('/home');
     });
   }
  // res.end('ok');
}

async function modificaTodo(id, titolo, descrizione, tipoLista, data, db, res){
   console.log("modifica funcions");
   if(titolo === null || titolo === "")
     res.end("bisogna inserire il titolo");
   else{
      
     db.collection('note').updateOne(
      { _id:ObjectID(id.trim()) },
      {
        $set: { 'titolo': titolo, 'note':descrizione, 'lista':tipoLista , 'data': data },
        $currentDate: { lastModified: true }
      }).then(function(){
       res.redirect('/home');
       });
   }
   //res.end('ok');
}

async function addLista(id, listaNuova, db, res){
   //console.log("aggiungi lista "+listaNuova);
   if(listaNuova === null || listaNuova === "" || listaNuova == null)
     res.end("bisogna inserire il nome della lista");
   else{
     db.collection('users').updateOne(
         {_id: ObjectID(id.trim())},
         {
            $push: {
               liste : listaNuova
            }
         }
      ).then(()=>{

         const query = {  _id : ObjectID(id.trim()) };
         const projection = {  liste:1};
         db.collection('users').find(query, { projection: projection } )
         .toArray(function(err, result) {
           if (err) throw err;
           //console.log(result[0])
           if(typeof result[0] === 'undefined' ){
              res.ok = false;
              //res.json({'email':"non ho trovato l'utente"});
              res.status(400);
              res.end();
              console.log("non ho trovato le liste");
           }else{
              var liste = result[0].liste;
              console.log("liste: "+ JSON.stringify({liste:liste}));
              res.json({liste:liste});
              res.end('ok');
             
           }
        })

      });
   }
}


async function deleteLista(id, listaEliminata, db, res){
   //console.log("aggiungi lista "+listaNuova);
   console.log("lista da eliminare "+listaEliminata);

   if(listaEliminata === null || listaEliminata === "" || listaEliminata == null)
     res.end("bisogna inserire il nome della lista");
   else{
     
     db.collection('users').updateOne(
         {_id: ObjectID(id.trim())},
         {
            $pull: {
               liste :  { $in : [ listaEliminata ] }
            }
         }
      ).then(()=>{ //cambio a "" tutte le note che avevano la lista eliminata
         db.collection('note').updateOne(
            { lista: listaEliminata },
            {
            $set: {  'lista':""  },
            $currentDate: { lastModified: true }
            })
      })
      .then(()=>{ //ritorno le liste

         const query = {  _id : ObjectID(id.trim()) };
         const projection = {  liste:1};
         db.collection('users').find(query, { projection: projection } )
         .toArray(function(err, result) {
           if (err) throw err;
           //console.log(result[0])
           if(typeof result[0] === 'undefined' ){
              res.ok = false;
              //res.json({'email':"non ho trovato l'utente"});
              res.status(400);
              res.end();
              console.log("non ho trovato le liste");
           }else{
              var liste = result[0].liste;
              console.log("liste: "+ JSON.stringify({liste:liste}));
              res.json({liste:liste});
              res.end('ok');
             
           }
        })

      });
   }
}

module.exports.findUser = findUser;
module.exports.getList = getList;
module.exports.eliminaTodo = eliminaTodo;
module.exports.aggiungiTodo = aggiungiTodo;
module.exports.modificaTodo = modificaTodo;
module.exports.addLista = addLista;
module.exports.deleteLista = deleteLista;
const path = require('path');

async function findUser( email, password, db, res) {
   if(email !==null && email !== "" && password !==null && password !== ""){
         console.log("campi validi")
         try {          
             console.log("cerco user in db");
             const query = {  email: email, password: password };
             const projection = { _id: 1, nome: 1 };
             db.collection('users').find(query, { projection: projection } )
             .toArray(function(err, result) {
               if (err) throw err;
               //console.log(result[0])
               if(typeof result[0] === 'undefined' ){
                  res.ok = false;
                  //res.json({'email':"non ho trovato l'utente"});
                  res.status(500);
                  res.end();
                  console.log("non ho trovato l'utente");
               }else{
                  var id = result[0]._id;
                  var nome = result[0].nome//result.projection.nome;
                  //console.log("result: nome "+nome+ " + id "+id);
                  currentUser = {id: id.toString(), nome:nome, email:email, password:password};
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




module.exports.findUser = findUser;
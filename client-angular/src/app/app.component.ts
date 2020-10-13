import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
//import { parse } from 'path';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-angular';
  urlServer = 'http://localhost:3000/login';
  //router : Router = null;
  email:string;
  password:string;

  constructor(private router: Router) {
    console.log("constructor");
    //this.router = routerr;
    
  }

/*login1 = () =>{
  console.log("login: "+this.email+ " "+this.password);
  fetch(this.urlServer, {method: 'GET' }) 
  .then(function(res){
      console.log("res: "+res.ok);
  });
}

login2 = () =>{
  console.log("login: "+this.email+ " "+this.password);
  fetch(this.urlServer, {method: 'POST', body: JSON.stringify({email: this.email, password: this.password}) }) 
  .then(function(res){
    res.text().then(function(text){
      console.log("res: "+text);
    })
      console.log("res: "+res.ok+" ");
  });
}
*/
login = () =>{
  
  console.log("login: "+this.email+ " "+this.password);
  fetch(this.urlServer, {method: 'POST', body: JSON.stringify({email: this.email, password: this.password}) }) /**  */
  .then(function(res){
    console.log(res)
    if(res.ok){

      if(res.status===500){
        console.log("errore")
      }

      //vul dire che la chiamata è andata bene e l'utente è stato trovato 
      res.json().then(data=>{ 
        console.log("return: "+data); 
        console.log(data);
        //var json = JSON.parse(data);
        console.log(data.email); 
        console.log("vado alla home");

      })

      
      //var router  = this.router;
      //router.navigate('/home');

    }else{
      //c'è stato un errore o l'utente non è stato trovato, da segnalare all'utante
      console.log("errore o utente non trovtao!")
    }
  });
}

}

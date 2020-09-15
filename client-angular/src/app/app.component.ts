import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-angular';

  email:string;
  password:string;

login1 = () =>{
  console.log("login: "+this.email+ " "+this.password);
  fetch('http://localhost:3000/login', {method: 'GET' }) 
  .then(function(res){
      console.log("res: "+res.ok);
  });
}

login2 = () =>{
  console.log("login: "+this.email+ " "+this.password);
  fetch('http://localhost:3000/login', {method: 'POST', body: JSON.stringify({email: this.email, password: this.password}) }) /**  */
  .then(function(res){
    res.text().then(function(text){
      console.log("res: "+text);
    })
      console.log("res: "+res.ok+" ");
  });
  
}

login = () =>{
  console.log("login: "+this.email+ " "+this.password);
  fetch('http://localhost:3000/login', {method: 'POST', body: JSON.stringify({email: this.email, password: this.password}) }) /**  */
  .then(function(res){
    if(res.ok){
      //vul dire che la chiamata è andata bene
      //devo controllare se l'utente è stato trovato o no
    }else{
      //c'è stato un errore, da segnalare all'utante
    }
  });
}

}

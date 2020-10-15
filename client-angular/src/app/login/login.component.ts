import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  urlServer = 'http://localhost:3000/login';
  routerG : Router = null;
  email:string;
  password:string; 

  constructor(private router: Router,private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
  }

  login = () =>{
    var routerL = this.router;
    console.log("login: "+this.email+ " "+this.password);
    fetch(this.urlServer, {method: 'POST', body: JSON.stringify({email: this.email, password: this.password}) }) /**  */
    .then(function(res){
      console.log(res)
      if(res.ok){
        //vul dire che la chiamata è andata bene e l'utente è stato trovato 
        res.json().then(data=>{ 
          //console.log("return: "+data); 
          console.log(data);
          //console.log(data.id); 
          
          console.log("vado alla home");
          routerL.navigate(['/home', data.id]); 
  
        })
  
        //var router  = this.router;
        //router.navigate('/home');
  
      }else if(res.status===400){
        //c'è stato un errore o l'utente non è stato trovato, da segnalare all'utante
        console.log("utente non trovtao!")
      }else{
        console.log("errore o utente non trovtao!")
      }
    });
  }
}

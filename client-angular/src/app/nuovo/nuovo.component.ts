import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nuovo',
  templateUrl: './nuovo.component.html',
  styleUrls: ['./nuovo.component.css']
})
export class NuovoComponent implements OnInit {
  
  
  urlServer = 'http://localhost:3000';
  userId: String;
  notaId: String;
  titolo: string;
  descrizione: string;

  nuovo: boolean=true;

  
  constructor(private router: Router,private route: ActivatedRoute) { 
    
    this.userId = this.router.getCurrentNavigation().extras.state.idUser;
    this.notaId = this.router.getCurrentNavigation().extras.state.idNota;   

    if(this.notaId === "null"){
      this.nuovo = true; //vengo da tasto nuovo
    }else{
      this.titolo = this.router.getCurrentNavigation().extras.state.titolo;
      this.descrizione = this.router.getCurrentNavigation().extras.state.descrizione;
      this.nuovo = false;//vengo da tasto modifica
    }
    console.log("è nuovo = "+this.nuovo);
  }


  ngOnInit(): void {
   
  }

  salva(){
    
    var routerS = this.router;
    if((this.titolo  === null || this.titolo === '') ){
      console.log("il titolo è obbligatorio")
    }else{

      fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: this.userId.toString(), azione: "aggiungi", titolo: this.titolo, descrizione: this.descrizione}) }) //, body: JSON.stringify({id: this.userId}) }) /**  */
      .then( async function (res) {
        console.log(res);
        if (res.ok) {
          //vul dire che la chiamata è andata bene e l'utente è stato trovato 
          console.log("nota aggiunta");
         
        }else {
          console.log("errore nell'aggiunta");
        }
      }).then(()=>{
        routerS.navigate(['/home',this.userId]); 
      }); 

    }

  }

  modifica(){

    console.log("titolo: "+this.titolo);
    if((this.titolo  === null || this.titolo === '') ){
      console.log("il titolo è obbligatorio")
    }else{

      fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: this.notaId.toString(), azione: "modifica", titolo: this.titolo, descrizione: this.descrizione}) }) //, body: JSON.stringify({id: this.userId}) }) /**  */
      .then( async function (res) {
        console.log(res);
        if (res.ok) {
          //vul dire che la chiamata è andata bene e l'utente è stato trovato 
          console.log("modifica aggiunta");
         
        }else {
          console.log("errore nella modifica");
        }
      }).then(()=>{
        this.router.navigate(['/home',this.userId]); 
      }); 

    }
  }


}

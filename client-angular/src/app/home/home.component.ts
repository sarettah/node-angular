import { Component, OnInit, Output } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urlServer = 'http://localhost:3000';
  userId: string;
  note:  Promise<any>|null = null;
 json: any=[];
 //titolo:string="null";
 descrizione:string="null";
 @Output() titolo:string = "null";
 
 constructor(private router: Router,private route: ActivatedRoute) {
    
    this.userId = this.route.snapshot.paramMap.get("id");
    //scarico la lista dei todo
    this.getLista()
   }

  ngOnInit(): void {
    
  }
 


   getLista(){
  //this.note = new Promise<any>(
 fetch(this.urlServer+'/home', { method: 'GET' }) //, body: JSON.stringify({id: this.userId}) }) /**  */
    .then( async function (res) {
      console.log(res);
      if (res.ok) {
        //vul dire che la chiamata è andata bene e l'utente è stato trovato 
        console.log("return ok getLista()");
        return await res.json();
        /*res.json().then(function(data){
          this.notes = new Promise<any>(data.notes);
          
        });*/      
        
      } else if (res.status === 400) {
        //c'è stato un errore o l'utente non è stato trovato, da segnalare all'utante
        console.log("nessun impegno trovato");
      } else {
        console.log("errore o impegni non trovtai!");
      }
    }).then(data => this.note = data.notes); //setto la variabile globale!


}

elimina(id:any){
  console.log("id: "+id.toString());
  fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: id.toString(), azione: "elimina"}) }) //, body: JSON.stringify({id: this.userId}) }) /**  */
    .then( async function (res) {
      console.log(res);
      if (res.ok) {
        //vul dire che la chiamata è andata bene e l'utente è stato trovato 
        console.log("nota eliminata");
      }else {
        console.log("errore nell'eliminazione");
      }
    }); 

    this.getLista();
}

modifica(id:any, titolo:any, descrizione:any){
  console.log("id: "+id+ " titolo: "+titolo+" descrizione:"+descrizione);
  this.titolo = titolo;
  this.descrizione = descrizione;
  this.router.navigateByUrl('/nuovo', { state: { idUser: this.userId, idNota: id, titolo: titolo, descrizione: descrizione } });
 
   
}

aggiungiVai(){
  this.router.navigateByUrl('/nuovo', { state: { idUser: this.userId, idNota: 'null' } }); 
}


}

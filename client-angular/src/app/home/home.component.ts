import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogListeComponent } from '../dialog-liste/dialog-liste.component';

export interface DialogData {
  message: string;
  eliminaB: boolean;
  idNota: string;
}
export interface DialogDataListe {
  listaNuova:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urlServer = 'http://localhost:3000';
  userId: string;
  //note:  Promise<any>|null = null;
  liste:  Promise<any>[]|string[];
 // json: any=[];
  //titolo:string="null";
  descrizione:string="null";
  titolo:string = "null";
 
  message:string;
  eliminaB:boolean;
  idNota:string;
  listaNuova:string;

  //divisione delle note per lista
  noteAll : Promise<any>[]|any[];
  notePerLista : Promise<any>[]|any[] = [];
  currentTab: number = 0;
 /* note2 : Promise<any>[]|any[];
  note3 : Promise<any>[]|any[];
  note4 : Promise<any>[]|any[];
  note5 : Promise<any>[]|any[];*/


 constructor(private router: Router,private route: ActivatedRoute, public dialog: MatDialog) {
    this.userId = this.router.getCurrentNavigation().extras.state.id;
    this.liste = this.router.getCurrentNavigation().extras.state.liste;
    //scarico la lista dei todo
    this.getListaNote()
 }

  ngOnInit(): void {}


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {message: this.message, elimina: this.eliminaB, idNota:this.idNota }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getListaNote();
    });
  }
  openDialogListe(): void {
    const dialogRef = this.dialog.open(DialogListeComponent, {
      width: '250px',
      data: {listaNuova: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed '+result);
      if(result == null || result === null || result ==""){
        
      }else{
        this.listaNuova = result;
        this.addListaNuova();
      }
      

    });
  }


getListaNote(){
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
    })
    .then(data => this.noteAll = data.notes); //setto la variabile globale!
}

elimina(id:any){
  this.message="Vuoi eliminare l'impegno?";
  this.idNota = id;
  this.eliminaB = true;
  this.openDialog();
}


modifica(id:any, titolo:any, descrizione:any, tipoLista:string){
  console.log("id: "+id+ " titolo: "+titolo+" descrizione:"+descrizione);
  this.titolo = titolo;
  this.descrizione = descrizione;
  this.router.navigateByUrl('/nuovo', { state: { idUser: this.userId, idNota: id, titolo: titolo, descrizione: descrizione,tipoLista:tipoLista, liste: this.liste } });
}

aggiungiVai(){
  this.router.navigateByUrl('/nuovo', { state: { idUser: this.userId, idNota: 'null', liste: this.liste } }); 
}

//divede per lista le note in base al tab selezionato
tabClick(tab) {
  console.log(tab.index+" - "+tab.tab.textLabel);
  if(this.currentTab !== tab.index){
    this.notePerLista = [];
  }
  if(tab.index===0){
    this.notePerLista = [];
  }else{
    for(var i=0; i<this.noteAll.length; i++){
      var nota = this.noteAll[i];
      console.log(nota.titolo);
      if(nota.lista ===tab.tab.textLabel){
        console.log(nota.lista);
        this.notePerLista.push(nota);
      }
    }
  }
}

creaLista(){
  console.log("creaLista");
  if( this.noteAll.length < 6 ){
    this.openDialogListe();
  }else{
    this.eliminaB=false;
    this.message = "Puoi creare solo da 1 a 5 liste"
    this.openDialog();
  }
  
}

eliminaLista(){
  console.log("eliminaLista");
}

addListaNuova(){
console.log("nuovalista " + this.listaNuova);

fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: this.userId.toString(), azione: "addLista", listaNuova: this.listaNuova}) }) //, body: JSON.stringify({id: this.userId}) }) 
      .then( async function (res) {
        console.log(res);
        if (res.ok) {
          //vul dire che la chiamata è andata bene e l'utente è stato trovato 
          console.log("lista aggiunta");
          return await res.json();
        }else {
          console.log("errore nell'aggiunta");
        }
      })
      .then(data => this.liste = data.liste)
      .then(()=>{
        //routerS.navigate(['/home',this.userId]); 
        this.router.navigateByUrl('/home', { state: { id: this.userId, liste:this.liste } });
      }); 


}

}

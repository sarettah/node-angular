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
  crea : boolean;
  liste:string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urlServer = 'http://localhost:3000';
  userId: string;
  nomeUSER:string;
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
  creaB:boolean;

  //divisione delle note per lista
  noteAll : Promise<any>[]|any[] = [];
  notePerLista : Promise<any>[]|any[] = [];
  currentTab: number = 0;
 /* note2 : Promise<any>[]|any[];
  note3 : Promise<any>[]|any[];
  note4 : Promise<any>[]|any[];
  note5 : Promise<any>[]|any[];*/

  ///cose da fare:
  //aggiungere il giorno alle note
  //visualizzarle dalla più recente alla più lontana!

 constructor(private router: Router,private route: ActivatedRoute, public dialog: MatDialog) {
    this.userId = this.router.getCurrentNavigation().extras.state.id;
    this.nomeUSER = this.router.getCurrentNavigation().extras.state.nome;
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
      console.log('The dialog was closed '+result);
      if(result != null && result==="eliminaClicked"){
        var index = this.noteAll.findIndex(x => x._id === this.idNota);
        console.log("index: "+index)
        if (index > -1) {
          this.noteAll.splice(index, 1);
          this.idNota="";
          console.log("length noteAll: "+ this.noteAll.length);
        }
      }else{
        console.log("COSA")
      }
      //this.getListaNote();
    });
  }
  openDialogListe(): void {
    const dialogRef = this.dialog.open(DialogListeComponent, {
      width: '250px',
      data: {listaNuova: "", crea:this.creaB , liste: this.liste }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed '+result);
      if(result == null || result === null || result ===""){
        
      }else{
        if(this.creaB){
          this.listaNuova = result;
          this.addListaNuova();
        }else{
          this.deleteLista(result);
        }
      }
      

    });
  }


getListaNote(){
  console.log("noteAll"+this.noteAll.length);
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
    .then(data => this.noteAll = data.notes)
    .then(()=>{console.log("noteAll"+this.noteAll.length)}); //setto la variabile globale!
}

elimina(id:any){
  this.message="Vuoi eliminare l'impegno?";
  this.idNota = id;
  this.eliminaB = true;
  this.openDialog();
}


modificaVai(id:any, titolo:any, descrizione:any, tipoLista:string, data:any){
  console.log("id: "+id+ " titolo: "+titolo+" descrizione:"+descrizione);
  this.titolo = titolo;
  this.descrizione = descrizione;
  this.router.navigateByUrl('/nuovo', { state: { idUser: this.userId, idNota: id, titolo: titolo, descrizione: descrizione,tipoLista:tipoLista, liste: this.liste, data:data, nome:this.nomeUSER  } });
}

aggiungiVai(){
  this.router.navigateByUrl('/nuovo', { state: { idUser: this.userId, idNota: 'null', liste: this.liste, nome:this.nomeUSER } }); 
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
    console.log(this.notePerLista);
    for(var i=0; i<this.noteAll.length; i++){
      var nota = this.noteAll[i];
//      console.log(nota.titolo);
      if(nota.lista ===tab.tab.textLabel){
//        console.log(nota.lista);
        this.notePerLista.push(nota);
      }
    }
  }
}
///////////////////////////////////////////////per le liste/////////////////////////////////////////////
creaLista(){
  console.log("creaLista"+this.liste.length);
  if( this.liste.length <= 5 ){
    this.creaB=true;
    this.openDialogListe();
  }else{
    this.eliminaB=false;
    this.message = "Puoi creare solo da 1 a 5 liste";
    this.openDialog();
  }
  
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

eliminaLista(){
  console.log("eliminaLista"+this.liste.length);
  if( this.liste.length <= 0 ){
    this.eliminaB=false;
    this.message = "Non hai liste da eliminare ('Tutte' non si più eliminare)";
    this.openDialog();
  }else{
    this.creaB=false;
    this.openDialogListe();
  }
}

deleteLista(lista:string){
  console.log("deleteLista "+lista);

  fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: this.userId.toString(), azione: "deleteLista", listaEliminata: lista}) }) //, body: JSON.stringify({id: this.userId}) }) 
      .then( async function (res) {
        console.log(res);
        if (res.ok) {
          //vul dire che la chiamata è andata bene e l'utente è stato trovato 
          console.log("lista eliminata");
          return await res.json();
        }else {
          console.log("errore nell'eliminazione");
        }
      })
      .then(data => this.liste = data.liste)
      .then(()=>{
        //routerS.navigate(['/home',this.userId]); 
        this.router.navigateByUrl('/home', { state: { id: this.userId, liste:this.liste } });
      }); 
}




}

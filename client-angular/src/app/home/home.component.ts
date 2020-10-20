import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogListeComponent } from '../dialog-liste/dialog-liste.component';

export interface DialogData {
  message: string;
  elimina: boolean;
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
  note:  Promise<any>|null = null;
  liste: Promise<String>|null = null;
  json: any=[];
  //titolo:string="null";
  descrizione:string="null";
  titolo:string = "null";
 
  message:string;
  idNota:string;
  listaNuova:string;

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
      data: {message: this.message, elimina:true, idNota:this.idNota }
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
      console.log('The dialog was closed');
      this.listaNuova = result;
      this.addListaNuova();
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
    }).then(data => this.note = data.notes); //setto la variabile globale!
}


elimina(id:any){
  this.message="Vuoi eliminare l'impegno?";
  this.idNota = id;
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


tabClick(tab) {
  console.log(tab.index);

}

creaLista(){
  console.log("creaLista");
  this.openDialogListe();
}

addListaNuova(){
console.log("nuovalista" + this.listaNuova);



}

}

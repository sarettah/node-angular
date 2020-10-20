import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PlatformLocation } from '@angular/common';


export interface DialogData {
  message: string;
  elimina: boolean;
  idNota: String;
}

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
  liste: string[];
  tipoLista:string;
  azioneMenu: string;
  nuovo: boolean=true;
  message:string;
  
  constructor(private router: Router,private route: ActivatedRoute,  public dialog: MatDialog, location: PlatformLocation) { 
    location.onPopState(() => {
      console.log(this.userId + this.liste.toString());
      router.navigateByUrl('/home', { state: { id: this.userId, liste:this.liste } });
      //console.log(window.location);
   }); 

    this.userId = this.router.getCurrentNavigation().extras.state.idUser;
    this.liste = this.router.getCurrentNavigation().extras.state.liste;
    this.notaId = this.router.getCurrentNavigation().extras.state.idNota;   

    if(this.notaId === "null"){
      this.nuovo = true; //vengo da tasto nuovo
      this.azioneMenu = "Aggiungi"
    }else{
      this.titolo = this.router.getCurrentNavigation().extras.state.titolo;
      this.descrizione = this.router.getCurrentNavigation().extras.state.descrizione;
      this.tipoLista = this.router.getCurrentNavigation().extras.state.tipoLista;
      this.nuovo = false;//vengo da tasto modifica
      this.azioneMenu = "Modifica"
    }
    console.log("è nuovo = "+this.nuovo);
  }


  ngOnInit(): void {
   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {message: this.message, elimina: false, idNota: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  aggiungi(){
    
    var routerS = this.router;
    if((this.titolo  == null || this.titolo === '') ){
      this.message = "Il titolo è obbligatorio";
      this.openDialog();
    }else{

      fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: this.userId.toString(), azione: "aggiungi", titolo: this.titolo, descrizione: this.descrizione, tipoLista:this.tipoLista}) }) //, body: JSON.stringify({id: this.userId}) }) /**  */
      .then( async function (res) {
        console.log(res);
        if (res.ok) {
          //vul dire che la chiamata è andata bene e l'utente è stato trovato 
          console.log("nota aggiunta");
         
        }else {
          console.log("errore nell'aggiunta");
        }
      }).then(()=>{
        //routerS.navigate(['/home',this.userId]); 
        routerS.navigateByUrl('/home', { state: { id: this.userId, liste:this.liste } });
      }); 

    }

  }

  modifica(){

    console.log("titolo: "+this.titolo);
    if((this.titolo  == null || this.titolo === '') ){
      this.message = "Il titolo è obbligatorio";
      this.openDialog();
    }else{

      fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: this.notaId.toString(), azione: "modifica", titolo: this.titolo, descrizione: this.descrizione, tipoLista: this.tipoLista}) }) //, body: JSON.stringify({id: this.userId}) }) /**  */
      .then( async function (res) {
        console.log(res);
        if (res.ok) {
          //vul dire che la chiamata è andata bene e l'utente è stato trovato 
          console.log("modifica aggiunta");
         
        }else {
          console.log("errore nella modifica");
        }
      }).then(()=>{
       // this.router.navigate(['/home',this.userId]); 
       this.router.navigateByUrl('/home', { state: { id: this.userId, liste:this.liste } });
      }); 

    }
  }


}

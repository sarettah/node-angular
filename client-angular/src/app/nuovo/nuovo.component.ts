import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PlatformLocation } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../AppDateAdapter';


export interface DialogData {
  message: string;
  elimina: boolean;
  idNota: String;
}

@Component({
  selector: 'app-nuovo',
  templateUrl: './nuovo.component.html',
  styleUrls: ['./nuovo.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class NuovoComponent implements OnInit {
  
  
  urlServer = 'http://localhost:3000';
  userId: String;
  nomeUSER:string;
  notaId: String;
  titolo: string;
  descrizione: string;
  liste: string[];
  tipoLista:string;
  data: Date;
  azioneMenu: string;
  nuovo: boolean=true;
  message:string;
  
  constructor(private router: Router,private route: ActivatedRoute,  public dialog: MatDialog, location: PlatformLocation) { 
    location.onPopState(() => {
      console.log(this.userId + this.liste.toString());
      router.navigateByUrl('/home', { state: { id: this.userId, liste:this.liste, nome:this.nomeUSER } });
      //console.log(window.location);
   }); 

    this.userId = this.router.getCurrentNavigation().extras.state.idUser;
    this.nomeUSER = this.router.getCurrentNavigation().extras.state.nome;
    this.liste = this.router.getCurrentNavigation().extras.state.liste;
    this.notaId = this.router.getCurrentNavigation().extras.state.idNota;   

    if(this.notaId === "null"){
      this.nuovo = true; //vengo da tasto nuovo
      this.azioneMenu = "Aggiungi"
    }else{
      this.titolo = this.router.getCurrentNavigation().extras.state.titolo;
      this.descrizione = this.router.getCurrentNavigation().extras.state.descrizione;
      this.tipoLista = this.router.getCurrentNavigation().extras.state.tipoLista;
      this.data = this.router.getCurrentNavigation().extras.state.data;
     /* var dataString = this.router.getCurrentNavigation().extras.state.data;
      if(dataString != null && dataString!==null ){
        var d = dataString.substring(0, 2);
        var m = dataString.substring(3, 5);
        var y = dataString.substring(6, 10);
        this.data = new Date(y+"-"+m+"-"+d);
        console.log(d+" "+m+" "+y+ " - "+this.data+" - "+dataString.length);
      }*/
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
    var dataString = "";
    if((this.titolo  == null || this.titolo === '') ){
      this.message = "Il titolo è obbligatorio";
      this.openDialog();
    }else{

      /*if(this.data != null){
        var month = this.data.getUTCMonth() + 1; //months from 1-12
        var day = this.data.getUTCDate() + 1;
        var year = this.data.getUTCFullYear();
        
        var dayS =day+ "";
        var monthS = month+"";
        if(day <10)
          dayS= "0"+day;
        if(month<10)
          monthS = "0"+month;

          dataString =  dayS + "-" + monthS + "-" + year  ;
      }*/


      fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: this.userId.toString(), azione: "aggiungi", titolo: this.titolo, descrizione: this.descrizione, tipoLista:this.tipoLista, data:this.data}) }) //, body: JSON.stringify({id: this.userId}) }) /**  */
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
        routerS.navigateByUrl('/home', { state: { id: this.userId, liste:this.liste, nome:this.nomeUSER } });
      }); 

    }

  }

  modifica(){
    var dataString="";
    console.log("titolo: "+this.titolo);
    if((this.titolo  == null || this.titolo === '') ){
      this.message = "Il titolo è obbligatorio";
      this.openDialog();
    }else{

      /*if(this.data != null){
       
        var month = this.data.getMonth() + 1; //months from 1-12
        var day = this.data.getDate() ;
        var year = this.data.getFullYear();
        var dayS =day+ "";
        var monthS = month+"";
        if(day <10)
          dayS= "0"+day;
        if(month<10)
          monthS = "0"+month;

        dataString =  dayS + "-" + monthS + "-" + year  ;
        
        console.log(this.data)
      }*/
      
      fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: this.notaId.toString(), azione: "modifica", titolo: this.titolo, descrizione: this.descrizione, tipoLista: this.tipoLista, data: this.data}) }) //, body: JSON.stringify({id: this.userId}) }) /**  */
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
       this.router.navigateByUrl('/home', { state: { id: this.userId, liste:this.liste, nome:this.nomeUSER } });
      }); 

    }
  }


}

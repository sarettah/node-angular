import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../login/login.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  urlServer = 'http://localhost:3000';
 // eliminaClicked : boolean = false;
  elimina:boolean;
  constructor( public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
     
      this.elimina = this.data.elimina;
    
    }

    onNoClick(): void {
      //console.log(this.data);
      this.dialogRef.close();
      
    }

  eliminaClick(){
    //this.eliminaB=true;
    console.log('ELIMINA')
    console.log("id: "+this.data.idNota.toString());
      fetch(this.urlServer+'/action', { method: 'POST',body: JSON.stringify({id: this.data.idNota.toString(), azione: "elimina"}) }) //, body: JSON.stringify({id: this.userId}) }) 
        .then( async function (res) {
          console.log(res);
          if (res.ok) {
            //vul dire che la chiamata è andata bene e l'utente è stato trovato 
            console.log("nota eliminata");
            
          }else {
            console.log("errore nell'eliminazione");
          }
        }); 
        this.dialogRef.close("eliminaClicked");
  }

  ngOnInit(): void {
  }

}

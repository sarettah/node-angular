import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogDataListe } from '../home/home.component';
import { DialogData } from '../login/login.component';

@Component({
  selector: 'app-dialog-liste',
  templateUrl: './dialog-liste.component.html',
  styleUrls: ['./dialog-liste.component.css']
})
export class DialogListeComponent implements OnInit {

  urlServer = 'http://localhost:3000';
  //listaNuova:string;

 constructor( public dialogRef: MatDialogRef<DialogListeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataListe) { 
      
    
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    //console.log(this.data);
    this.dialogRef.close();
    
  }

  salva(){
    //console.log("salva lista: "+this.listaNuova);
  }

}

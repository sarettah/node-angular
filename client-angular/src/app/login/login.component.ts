import { Component, OnInit , Inject} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface DialogData {
  message: string;
  elimina: boolean;
  idNota: String;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;

  urlServer = 'http://localhost:3000/login';
  routerG : Router = null;
  email:string;
  password:string; 

  constructor(private router: Router,private route: ActivatedRoute, public dialog: MatDialog) { 

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

  login = () =>{
    var routerL = this.router;
    console.log("login: "+this.email+ " "+this.password);
    if(this.email === "" || this.email ==null ){
      this.message="Inserire la Email";
      this.openDialog();
    }else if(this.password === "" || this.password ==null ){
      this.message="Inserire la Password";
      this.openDialog();
    }else{
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
            routerL.navigateByUrl('/home', { state: { id: data.id, liste: data.liste , nome: data.nome} });
            //routerL.navigate(['/home', data.id]); 
    
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
}



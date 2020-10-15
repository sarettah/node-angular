import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
//import { parse } from 'path';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-angular';
  

  constructor(private router: Router,private route: ActivatedRoute) {
    console.log("constructor");
    //this.routerG = router;
    router.navigate(['/login']);
  }

/*login1 = () =>{
  console.log("login: "+this.email+ " "+this.password);
  fetch(this.urlServer, {method: 'GET' }) 
  .then(function(res){
      console.log("res: "+res.ok);
  });
}

login2 = () =>{
  console.log("login: "+this.email+ " "+this.password);
  fetch(this.urlServer, {method: 'POST', body: JSON.stringify({email: this.email, password: this.password}) }) 
  .then(function(res){
    res.text().then(function(text){
      console.log("res: "+text);
    })
      console.log("res: "+res.ok+" ");
  });
}
*/

}

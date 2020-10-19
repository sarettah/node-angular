import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NuovoComponent } from './nuovo/nuovo.component';

//material
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home/:id', component: HomeComponent},
//  { path: 'nuovo/:idUser/:idNota', component: NuovoComponent}
{ path: 'nuovo', component: NuovoComponent}
  // { path: 'gioca/:id/:name', component: GiocaComponent}
 ];

@NgModule({
  
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NuovoComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

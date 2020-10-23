import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NuovoComponent } from './nuovo/nuovo.component';
import { DialogComponent } from './dialog/dialog.component';

//material
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {  MatSelectModule } from '@angular/material/select';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { DialogListeComponent } from './dialog-liste/dialog-liste.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxMasonryModule } from 'ngx-masonry';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
//  { path: 'nuovo/:idUser/:idNota', component: NuovoComponent}
{ path: 'nuovo', component: NuovoComponent}
  // { path: 'gioca/:id/:name', component: GiocaComponent}
 ];

@NgModule({
  
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NuovoComponent,
    DialogComponent,
    DialogListeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatGridListModule,
    NgxMasonryModule,
    BrowserAnimationsModule
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';

import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PagesModule } from './pages/pages.module';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
    



  ],
  imports: [
    RouterModule,//PARA QUE SE PUEDA USAAR EL ROUTER-OULET
    BrowserModule,
    AppRoutingModule,
    PagesModule, // jala las rutas de las paginas
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

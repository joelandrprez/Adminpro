import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu:any = [];
  public menube!:any;
  // menu : any [] = [
  //   {
  //   titulo:'Principal',
  //   icono:'mdi mdi-gauge',
  //   submenu:[
  //     {titulo:'Menu',url:''},
  //     {titulo:'ProgressBar',url:'progress'},
  //     {titulo:'Grafica',url:'grafica1'}
  //     ]
  //   },{
  //   titulo:'Mantenimiento',
  //   icono:'mdi mdi-folder-lock-open',
  //   submenu:[
  //     {titulo:'Usuarios',url:'usuarios'},
  //     {titulo:'Hospitales',url:'hospitales'},
  //     {titulo:'Medicos',url:'medicos'},
  //     ]
  //   }
    
  // ]
  cargarMenu(){
    this.menube = localStorage.getItem('menu');
    this.menu = JSON.parse( this.menube )|| [];
    
    

  }
  constructor() { 

  }
}

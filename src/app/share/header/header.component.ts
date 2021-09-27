import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{

  public usuario?:Usuario;
  public largocorreo:any;
  public largonombre:any;


  constructor(  private usuarioService:UsuarioService,
                private router:Router
    
                ){
                  this.usuario = usuarioService.usuario;
                  this.largocorreo = this.usuario?.email.length;
                  this.largonombre = this.usuario?.nombre.length;



                  
  }
  
  ngOnInit(): void {
    
  }

  logout(){
    this.usuarioService.logout();
  }
  buscar(termino:string){

    if(termino.length === 0 ){
      return ;
    }
    console.log(termino);

    this.router.navigateByUrl(`dashboard/busqueda/${termino}`)
    
  }

}

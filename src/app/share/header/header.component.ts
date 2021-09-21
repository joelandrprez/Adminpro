import { Component, OnInit } from '@angular/core';
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
                ){
                  this.usuario = usuarioService.usuario;
                  this.largocorreo = this.usuario?.email.length;
                  this.largonombre = this.usuario?.nombre.length;

                  console.log(this.largocorreo);
                  
  }
  
  ngOnInit(): void {
    
  }

  logout(){
    this.usuarioService.logout();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModelImagenService } from 'src/app/services/model-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {

  public totalUsuarios:number = 0;
  public usuarios:Usuario[]=[];

  public usuariosTemp:Usuario[]=[];


  public desde:number = 0;
  public cargando:boolean = true;

  public imgsubs ?:Subscription;

  constructor(private usuariosServices:UsuarioService,
              private busquedaService:BusquedasService,
              private modalImagenService:ModelImagenService) { }
  ngOnDestroy(): void {
    this.imgsubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgsubs = this.modalImagenService.nuevaImagen?.subscribe(img => {
      this.cargarUsuarios();
    })
  }
  
  cargarUsuarios(){
    this.cargando = true;
    this.usuariosServices.cargarUsuarios(this.desde)
      .subscribe(({total,usuarios}) => {


        this.totalUsuarios = total;

        this.usuariosTemp = usuarios;

        this.usuarios = usuarios;

        this.cargando = false;
        
      })
  }
  
  cambiarPagina( valor:number ){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0

    }else if (this.desde>=this.totalUsuarios){

      this.desde -=valor; 
      
    }
    this.cargarUsuarios();
  }


  buscar( termino: string){

    if(termino.length === 0){
      this.usuarios=this.usuariosTemp

      return ;

    }


    console.log(termino);
    
    this.busquedaService.buscarm('usuarios',termino)
                        .subscribe((res:Usuario[]) => {
                          this.usuarios = res;
                        })
    
  }
  eliminarUsuario(usuario:any){

      if(usuario.uid===this.usuariosServices.usuario?.uid){
        Swal.fire(
          'ERROR',
          `no puede borrarse a si mismo!`,
          'error'
        )
      } else {
        Swal.fire({
          title: '¿Borrar usuario?',
          text: `esta apunto de eliminar a ${usuario.nombre}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borrarlo!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.usuariosServices.EliminarUsuario(usuario)
              .subscribe(resp => {
                this.cargarUsuarios();
                Swal.fire(
                  'Usuario Borrado!',
                  `el usuario ${usuario.nombre} fue elimianado correctamente`,
                  'success'
                )
              })
          }
        })
      }



    
  }
  cambiarRole(usuario:any){
    this.usuariosServices.guaradarUsuario(usuario)
      .subscribe(resp => {
        console.log(resp);
        
      })
    

  }
  abrirModal(usuario:any){
    console.log('el objeto que llega a abrirModal'+usuario.img);
    this.modalImagenService.abrilModal('usuarios',usuario.uid,usuario.img);
    
  }
  

}

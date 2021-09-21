import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup;
  public usuario?:Usuario;
  public imagenSubir!:File;
  public imgTemp?:any  ;


  constructor(private fb:FormBuilder ,
              private usuarioService:UsuarioService,
              private fileuploadService:FileUploadService) { 

                this.usuario = usuarioService.usuario;

              }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre:[this.usuario?.nombre,Validators.required],
      email:[this.usuario?.email,[Validators.required,Validators.email]]
    });
  }

  actualizarPerfil(){
    console.log(this.perfilForm!.value);
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
                        .subscribe(resp =>{
                          console.log(resp);
                          const { nombre,email } = this.perfilForm.value;
                          this.usuario!.nombre=nombre;
                          this.usuario!.email=email;
                          Swal.fire('Guardado','Cambios fueron guardados','success');
                        },(error)=>{
                          console.log(error.error.msg);
                          Swal.fire('Guardado',error.error.msg,'error');
                        })
                        
    
  }
  cambiarImagen(file:any):any {
    
    console.log(file.target.files[0]);
    
    this.imagenSubir = file.target.files[0];
    if(!file){
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
      
      // console.log(reader.result);
      
    }
    

  }

  subirImagen(){
   
    this.fileuploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuarioService.uid)
    .then(img => {
      this.usuario!.img = img
      Swal.fire('Guardado','La imagen se guardo','success');
    },(errr)=>{
      Swal.fire('Guardado','No se pudo subir la imagen','error');
    } );
  }

  


}

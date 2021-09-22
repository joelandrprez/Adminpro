import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModelImagenService } from 'src/app/services/model-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  public perfilForm!:FormGroup;
  public usuario!:Usuario;
  public imagenSubir!:File;
  public imgTemp?:any  ;


  constructor(  public fileuploadService:FileUploadService,
                public modalImagenService:ModelImagenService ) { }

  ngOnInit(): void {
  }
  cerrarModal(){
    this.modalImagenService.cerrarModal();
    this.imgTemp=null
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    console.log(this.imagenSubir);
    

    this.fileuploadService.actualizarFoto(this.imagenSubir,tipo,id)
    .then(img => {
      Swal.fire('Guardado','La imagen se guardo','success');
      this.modalImagenService.nuevaImagen?.emit(img);
      this.cerrarModal();
    },(err)=>{
      console.log(err);
      
      Swal.fire('Guardado','No se pudo subir la imagen','error');
    } );
  }

}

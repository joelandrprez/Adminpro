import { EventEmitter, Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
import { environment } from '../../environments/environment';
import { FileUploadService } from './file-upload.service';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModelImagenService {
  private _ocultaraModal:boolean = true;
  public tipo !:'usuarios'|'medicos'|'hospitales';
  public id !: string;
  public img !: string;

  public nuevaImagen?: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }
  get OculatarModal(){
    return this._ocultaraModal
  }

  abrilModal(
              tipo:'usuarios'|'medicos'|'hospitales',
              id:string,
              img:string='no-img'
            ){
              
    this._ocultaraModal = false,
    this.tipo = tipo;
    this.id = id;
    this.img=img;

    console.log('services ' + this.img);

    if( img.includes('https') ){
      console.log('else'+img);
      
      this.img = img
    }else{
      console.log('else'+img);
      
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
     
    console.log(img);
    

  }

  
  cerrarModal(){
    this._ocultaraModal = true

  }




}

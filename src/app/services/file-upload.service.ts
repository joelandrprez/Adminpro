import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
      archivo :File,
      tipo:'usuarios'|'medicos'|'hospitales',
      id:String
  ){

    try {
      const url = `${base_url}/upload/${tipo}/${id}`

      const formData = new FormData();
      formData.append('imagen',archivo);

      const rpta = await fetch(url,{
        method:'PUT',
        headers:{
          'x-token':localStorage.getItem('token')||''
        },
        body:formData
      });
      const body =  await rpta.json();

      if( body.ok ){
        return body.nombreArchivo;
      }else{
        console.log(body);
        
        return false
      }
      


      
    } catch (error) {
      console.log(error);
      return false;
      
    }

  }



}

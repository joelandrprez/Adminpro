import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { Medico } from '../models/medico.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http:HttpClient, ){ }


  get Token():string{
    return localStorage.getItem('token')||'';

  }

  get headers(){
    return {
      headers:{
        'x-token':this.Token
      }
    }
  }
  cargarMedicos(){
    const url  = `${base_url}/medicos`;
    return this.http.get<any>(url,this.headers)
                    .pipe(
                      map(
                        (resp:{ok:boolean,medicos:any[]})=>resp.medicos)
                    )
  }
  crearMedico(medico:Medico){
    const url = `${base_url}/medicos`;
    return this.http.post(url,medico,this.headers)

  }
  actualizarMedico(medico:any){
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url,{medico},this.headers);

  }
  eliminarMedico(id:string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.delete(url,this.headers)
  }
  obtenerMedicoporId(id:string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<any>(url,this.headers)
                    .pipe(
                    map((resp:{ok:boolean,medicos:any[]})=>resp.medicos))
  }

}

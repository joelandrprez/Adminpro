import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

import { Hospital } from '../models/hospitales.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitaleService {

  constructor( private http:HttpClient, ) { }


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


  cargarHospitales(){

    const url = `${base_url}/hospitales`;
    return this.http.get<any>(url,this.headers)
                    .pipe(
                      map(
                        (resp:{ok:boolean,hospital:any[]}) =>resp.hospital)
                    )

  }
  crearHospital(nombre:string){
    const url = `${base_url}/hospitales`;
    return this.http.post(url,{nombre},this.headers);

  }

  actualizarHospital(nombre:string,id_:string){
    const url = `${base_url}/hospitales/${id_}`;
    return this.http.put(url,{nombre},this.headers);
  }
  
  eliminarHospital(id_:string){

    const url = `${base_url}/hospitales/${id_}`;
    return this.http.delete(url,this.headers);
  }

}


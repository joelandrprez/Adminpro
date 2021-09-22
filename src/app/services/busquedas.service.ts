import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CargarUsuario } from '../interface/cargar-usuario.interface';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

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

  transformarUsuarios(resultados:any[]):Usuario[]{

   return resultados.map( user => new Usuario(
                                  user.nombre,
                                  user.email,
                                  user.role,
                                  '',
                                  user.img,
                                  user.google,
                                  user.uid))
  }
  
  buscarm(tipo: 'usuarios' | 'medicos' | 'hospitales',
        termino:string ){

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get(url,this.headers)
                    .pipe(
                      map((resp:any) => {

                            switch(tipo){
                              case 'usuarios':
                                return this.transformarUsuarios(resp.data)
                              case 'medicos':
                                return this.transformarUsuarios(resp.data)
                              case 'hospitales':
                                return this.transformarUsuarios(resp.data)
                              default:
                              return [];

                            }
                      })
         );
  }




}


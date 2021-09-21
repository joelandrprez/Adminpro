import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators'; // guardar en local storage
import { of } from 'rxjs';
import { Router } from '@angular/router';


import { RegisterForm } from 'src/app/interface/regiter-form.interface';
import { LoginForm } from '../interface/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare var gapi:any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any;
  public usuario?:Usuario;

  constructor( private http:HttpClient,
               private router:Router,
               private ngzone:NgZone) { 

                 this.googleInit();

  }

  get Token():string{
    return localStorage.getItem('token')||'';

  }
  get uid():string{
    return this.usuario?.uid||'';
  }

  logout(){
    localStorage.removeItem('token');
    

    this.auth2.signOut().then( () => {
      this.ngzone.run(()=>{
        this.router.navigateByUrl('/login')
      })
      
    });

  }

  validarToken(){


    const token =localStorage.getItem('token')|| '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      map( (res:any) => {

        const { nombre,
                email,
                role,
                google,
                img, 
                uid } = res.usuario;

        this.usuario = new Usuario(nombre,email,role,'',img,google,uid);

        

        localStorage.setItem('token',res.token)
        return true;


      }),catchError(error => of(false))
    )
  }





  crearUsuario(formData:RegisterForm){

    
    return this.http.post(`${base_url}/usuarios`,formData)
                    .pipe(
                      tap(  (res:any) => {
                        localStorage.setItem('token',res.token)
                        
                      }))
  }



  

  actualizarUsuario(data:{email:string,nombre:string,role?:string}){

    data = { ... data , role:this.usuario?.role }

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers:{
        'x-token':this.Token
    }})

  }; 






  googleInit(){

    return  new Promise<void>(resolve => {// promesas siempre se vana a ejecutar
        gapi.load('auth2', ()=>{ //para poder utilizaart el this
    
          this.auth2 = gapi.auth2.init({
          client_id: '489077016056-mrg10ganfaubh1782fmeqerbh0u19vmk.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
      
        });
        resolve();
      });
    })

   }

  login(formData:LoginForm){
    return this.http.post(`${base_url}/login`,formData)
                    .pipe(
                          tap(  (res:any) => {
                            localStorage.setItem('token',res.token)
                            
                          })
                     )

  }
  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
                    .pipe(
                          tap(  (res:any) => {
                            localStorage.setItem('token',res.token)
                            
                          })
                     )

  }

}

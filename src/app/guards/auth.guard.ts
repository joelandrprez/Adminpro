import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
              private usuarioService:UsuarioService,
              private router:Router
              ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.usuarioService.validarToken().pipe(
        tap(estaAutenticado => {
          if(!estaAutenticado){
            this.router.navigateByUrl('/login');
          }

        })
      );
      // console.log('paso por el can Activate');
      
    return false;
  }
  
}
  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AccountSettinngsComponent } from './account-settinngs/account-settinngs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';

const routes:Routes = [
    { 
        path:'dashboard',component:PagesComponent ,//rutas hijas
        canActivate:[AuthGuard],
        children:[
          {path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
          {path:'progress',component:ProgressComponent,data:{titulo:'Progress Bar'}},
          {path:'grafica1',component:Grafica1Component,data:{titulo:'Graficas'}},
          {path:'perfil',component:PerfilComponent,data:{titulo:'Perfil de Usuario'}},
          {path:'account-setting',component:AccountSettinngsComponent,data:{titulo:'account-setting'}},
          {path:'usuarios',component:UsuariosComponent,data:{titulo:'Usuario de aplicacion'}},
          
          {path:'',redirectTo:'/dashboard',pathMatch:'full'},
        ]
    
      }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModule { }

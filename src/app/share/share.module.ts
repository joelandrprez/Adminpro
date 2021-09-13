import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { PagesComponent } from '../pages/pages.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ShareModule { }

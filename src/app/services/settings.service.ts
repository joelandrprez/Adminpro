import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linktheme = document.querySelector('#theme');

  constructor() { 
    const url =  localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

    this.linktheme?.setAttribute('href',url)
    
  }
  
  changeTheme(theme:String){


    const url = `./assets/css/colors/${theme}.css`;

    this.linktheme?.setAttribute('href',url)
    localStorage.setItem('theme',url);
    this.checkCurrenTheme();
    
  }
  checkCurrenTheme(){
     const links = document.querySelectorAll('.selector')
     links.forEach(elem => {
     elem.classList.remove('working');
     const btntheme = elem.getAttribute('data-theme')
     const btnthemeUrl = `./assets/css/colors/${btntheme}.css`;
     const currentTheme = this.linktheme?.getAttribute('href');

     if(btnthemeUrl === currentTheme){

       elem.classList.add('working');

     }
   })
   
 }

}

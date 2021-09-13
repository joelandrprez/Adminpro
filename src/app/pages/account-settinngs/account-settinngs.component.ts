import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settinngs',
  templateUrl: './account-settinngs.component.html',
  styles: [
  ]
})
export class AccountSettinngsComponent implements OnInit {
   
    
    // public links:any;
  constructor(private settingServices:SettingsService){
    
  }
  ngOnInit():void{
    
  }

  changeTheme(theme:String){
    this.settingServices.changeTheme(theme);
    
  }


}

import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AdminComponent } from 'src/app/admin/admin.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {

  allowCreate=true;
  // isAdmin:boolean=false;

  constructor(private settingService:SettingService,private authService:AuthService){}

  ngOnInit(): void {

    this.settingService.getSettings().
    subscribe(resData=>{
      this.allowCreate=resData.isCreate;
    })
    
  }

  @Input() isSideBar:boolean=false;

}

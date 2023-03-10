import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {

  allowCreate=true;

  constructor(private settingService:SettingService){}

  ngOnInit(): void {

    this.settingService.getSettings().
    subscribe(resData=>{
      this.allowCreate=resData.isCreate;
    })
    
  }

  @Input() isSideBar:boolean=false;

}

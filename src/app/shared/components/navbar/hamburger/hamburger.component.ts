import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {

  allowCreate:boolean=true;
  isAdmin:boolean=false;

  constructor(private settingService:SettingService,private authService:AuthService,
    private router:Router){}

  @Input() isSideBar:boolean=false;

  ngOnInit(): void {

    this.settingService.getSettings().
    subscribe(resData=>{
      this.allowCreate=resData.isCreate;
    });
  }
  
  onHome(){
    if(!localStorage.getItem('userData')){
      alert('Please login first to proceed!');
    }
    else{
      this.router.navigate(['/home']);
    }
  }


  onQuickCreateProduct(){
    if(!localStorage.getItem('userData')){
      alert('Please login first to proceed!');
    }
    else{
      this.router.navigate(['/quick-create-product']);
    }

  }

  onCreateProduct(){
    if(!localStorage.getItem('userData')){
      alert('Please login first to proceed!');
    }
    else{
      this.router.navigate(['/create-product']);
    }
  }

  



}

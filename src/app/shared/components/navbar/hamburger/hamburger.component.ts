import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/model/userdata.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {

  allowCreate: boolean = true;
  userData: UserData[] = [];
  isAdmin: boolean = false;

  constructor(private settingService: SettingService,
    private router: Router, private userService: UserService) { }


  ngOnInit(): void {

    this.settingService.getSettings().
      subscribe(resData => {
        this.allowCreate = resData.isCreate;
      });

    if (localStorage.getItem('user')) {
      this.userService.getUserData().
        subscribe(resData => {
          this.userData = resData;
          this.isAdmin = this.userData[0].isAdmin;
        })
    }
   
  }


  onHome() {
    if (!localStorage.getItem('user')) {
      alert('Please login first to proceed!');
    }
    else {
      this.router.navigate(['/home']);
    }
  }
  
  onQuickCreateProduct() {
    if (!localStorage.getItem('user')) {
      alert('Please login first to proceed!');
    }
    else {
      this.router.navigate(['/quick-create-product']);
    }
  }

  onCreateProduct() {
    if (!localStorage.getItem('user')) {
      alert('Please login first to proceed!');
    }
    else {
      this.router.navigate(['/create-product']);
    }
  }



}







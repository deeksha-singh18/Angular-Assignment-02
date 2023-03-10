import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService){}

  private userSub:Subscription;
  isAuthenticated=false;
  @Output() sideBarToggled = new EventEmitter<boolean>();
  showSideBar: boolean = false;

  

  ngOnInit() {
    
      this.userSub=this.authService.user.subscribe(user => {
      this.isAuthenticated= !!user;
      console.log(this.isAuthenticated);

    });
  }


  SideNavToggle() {
    this.showSideBar = !this.showSideBar;
    this.sideBarToggled.emit(this.showSideBar);
  }

 

  onLogin(){
    this.router.navigate(['/login']);
  }


  onLogout(){
    
    console.log("Sucessfully logout");
    // console.log("user => ",this.authService.user);
    this.authService.logout();
    // console.log("user => ",this.authService.user);
    this.router.navigate(['/login'])
  }


  ngOnDestroy(){
    this.userSub.unsubscribe();
  }


}

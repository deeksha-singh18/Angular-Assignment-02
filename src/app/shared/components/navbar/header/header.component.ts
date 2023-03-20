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

  // private userSub:Subscription;
  isAuthenticated=false;
  @Output() sideBarToggled = new EventEmitter<boolean>();
  showSideBar: boolean = false;
  isLoaded:boolean;
  
  
  ngOnInit(){

    this.isAuthenticated=localStorage.getItem('userData')? true : false;

    //  this.authService.user.subscribe(res => {
    //    this.isAuthenticated=res ? true : false;
    //    this.isLoaded=true;
     
    //   console.log("user is" ,this.isAuthenticated);
    //   console.log(res);
    //   });
   
    
  }


  SideNavToggle() {
    this.showSideBar = !this.showSideBar;
    this.sideBarToggled.emit(this.showSideBar);
  }

 

  onLogin(){
    this.router.navigate(['/login']);
  }


  onLogout(){
    this.authService.logout();
    this.isAuthenticated=false;
    console.log("Sucessfully logout");
    this.router.navigate(['/main'])
  }


  // ngOnDestroy(){
  //   this.userSub.unsubscribe();
  // }


}

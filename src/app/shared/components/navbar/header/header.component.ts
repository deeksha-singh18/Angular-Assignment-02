import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'src/app/model/userdata.model';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService,private http:HttpClient,
    private userService:UserService){}

  // private userSub:Subscription;
  isAuthenticated=false;
  userData:UserData[]=[];
  userInfo:UserData;
  userName:string="";
  isAdmin:boolean=false;
  
  ngOnInit(){
    this.isAuthenticated=localStorage.getItem('user')? true : false;

    // this.userService.userInfo
    // .subscribe(resData =>{
    //   this.userInfo=resData;
    //   this.userName=resData.fullName;
    //   console.log(this.userName);
      
    // })
    if(this.isAuthenticated){

    this.userService.getUserData()
    .subscribe(resData=>{
      this.userData=resData;
      this.userName=this.userData[0].fullName;
      this.isAdmin=this.userData[0].isAdmin;
    })
  }
    

    //  this.authService.user.subscribe(res => {
    //    this.isAuthenticated=res ? true : false;
    //    this.isLoaded=true;
     
    //   console.log("user is" ,this.isAuthenticated);
    //   console.log(res);
    //   });
   
    
  }
  
  onLogin(){
    this.router.navigate(['/login']);
  }


  onLogout(){
    this.authService.logout();
    this.isAuthenticated=false;
    console.log("Sucessfully logout");
    if(this.isAdmin){
      this.router.navigate(['/login-type'])
    }
    else{
      this.router.navigate(['/main'])
    }
   
   
  }


  // ngOnDestroy(){
  //   this.userSub.unsubscribe();
  // }


}

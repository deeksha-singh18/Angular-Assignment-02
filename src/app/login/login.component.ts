import { Component, ViewChild} from '@angular/core';
import {NgForm } from "@angular/forms";
import {Router} from '@angular/router';
import { AuthService} from '../shared/services/auth.service';
import { AuthResponseData } from '../model/authresponse.model';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  error:string = "";
  loginMode=true;
  isLoading=false;
  admin=false;

  @ViewChild('f') loginForm:NgForm;


  constructor(private router:Router,
    private authService:AuthService){

  }


  onSwitch(){
    this.loginMode=!this.loginMode;
  }


  
  onSubmit() {
    
    console.log(this.loginForm);

    if(this.loginForm.invalid){
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let authObs:Observable<AuthResponseData>;
    this.isLoading=true;

    if(this.loginMode){
      authObs=this.authService.login(email,password)
    }

    else{
      authObs=this.authService.signup(email,password);
    }

      authObs.subscribe(resData => {
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/main']);
        
      },
      errorMessage => {
        console.log(errorMessage);
        this.error=errorMessage;
        this.isLoading=false;
        
      });
      
      this.loginForm.reset();


  }

  
  onHandleError(){
    this.error=null;
  }

 

  
  

  
}


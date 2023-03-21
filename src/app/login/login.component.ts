import { Component,ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { AuthResponseData } from '../model/authresponse.model';
import { Observable } from 'rxjs';
import { UserData } from '../model/userdata.model';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent{

  error: string = "";
  loginMode:boolean = true;
  userData: UserData;
  

  @ViewChild('f') loginForm: NgForm;


  constructor(private router: Router,private authService: AuthService,
    private userService: UserService) {}

  onSwitch() {
    this.loginMode = !this.loginMode;
  }
  
  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const userValue = this.loginForm.value;
    
    let authObs: Observable<AuthResponseData>;

    if (this.loginMode) {
      authObs = this.authService.login(email, password)
    }

    else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(resData => {
      if (!this.loginMode) {
        this.userData = {
          id: resData.localId,
          fullName: userValue.fullName,
          email: userValue.email,
          password: userValue.password,
          isAdmin:false
        }
        this.authService.storeUserData(this.userData)
      }
    console.log(resData);
    this.router.navigate(['/main']);
    },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
    });
    
    this.loginForm.reset();
  }


  onHandleError() {
    this.error = null;
  }







}


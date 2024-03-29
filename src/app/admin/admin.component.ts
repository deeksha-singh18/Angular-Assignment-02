import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent {


  error:string = "";
  @ViewChild('f') loginForm:NgForm;


  constructor(private router:Router,
    private authService:AuthService){}

  
  onSubmit() {
    
    console.log(this.loginForm);

    if(this.loginForm.invalid){
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email,password)
    .subscribe(resData => {
        console.log(resData);
        this.router.navigate(['/settings']);
      },

      errorMessage => {
        console.log(errorMessage);
        this.error=errorMessage;
      });
      
      this.loginForm.reset();
  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError,catchError,Subject,tap } from 'rxjs';
import { AuthResponseData } from 'src/app/model/authresponse.model';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    constructor(private http:HttpClient,private router:Router) { }
  
    user = new Subject<User>();
    // isAdmin:boolean=false;


    login(email:string,password:string){

       return this.http.post<AuthResponseData>(
        
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzR7D1QtQdfjFhjDY02UMII45hrGD2BK0',
      
            {email:email,
             password:password,
             returnSecureToken:true
          }
          )
          .pipe(catchError(this.handleAuthenticatedErrors)
          ,tap(resData => {
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            );
          })
          );
    
    }



    signup(email:string,password:string){

      return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFy_rXBzm_B2iO8dHtouATTTah76nDOr8'
            ,{
                email:email,
                password:password,
                returnSecureToken:true
            
            }
            )
            .pipe(catchError(this.handleAuthenticatedErrors),
            tap(resData => {
                 this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
              );
            })
            );
        }
    



    handleAuthenticatedErrors(errorRes:HttpErrorResponse){

       let errorMessage = "An unknown error occured ";
       if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }

        switch(errorRes.error.error.message){
           case 'EMAIL_EXISTS':
              errorMessage="This email exists already";
              break;
           case 'EMAIL_NOT_FOUND':
              errorMessage="This email is not found";
              break;
           case 'INVALID_PASSWORD':
              errorMessage="The password is not correct";
              break;

        }
        return throwError(errorMessage);


    }


    private handleAuthentication(
      email:string,
      userId:string,
      token:string,
      expiresIn:number)
      
      {
      const expirationDate= new Date(new Date().getTime() + expiresIn*1000);
      const user = new User(email,userId,token,expirationDate);
      console.log("user => ",user);
      this.user.next(user);

    }
  


    logout(){
      this.user.next(null);
    }

   



  



  
}

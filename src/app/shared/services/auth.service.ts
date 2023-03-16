import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError,catchError,Subject,tap } from 'rxjs';
import { AuthResponseData } from 'src/app/model/authresponse.model';
import { User } from 'src/app/model/user.model';
import { UserData } from 'src/app/model/userdata.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService{

    constructor(private http:HttpClient,private router:Router) { }

    user = new Subject<User>();

  


    login(email:string,password:string){

       return this.http.post<AuthResponseData>(
        
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzR7D1QtQdfjFhjDY02UMII45hrGD2BK0',
      
            {email:email,
             password:password,
             returnSecureToken:true
          })
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
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzR7D1QtQdfjFhjDY02UMII45hrGD2BK0'
            ,{
                email:email,
                password:password,
                returnSecureToken:true
             })
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


    handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
      
      const expirationDate= new Date(new Date().getTime() + expiresIn*1000);
      const user= new User(email,userId,token,expirationDate);
      console.log("user => ",user);
      this.user.next(user);

    }

    
    logout(){
      this.user.next(null);
    }

    userLoggedIn(user){
      console.log("user logged in");
      
      this.user.next(user);
    }





    storeUserData(userData:UserData){
      return this.http.post('https://angular-assignment-2906b-default-rtdb.firebaseio.com/users.json',userData)
         .subscribe(resData =>{
          console.log(resData);
           
         })
   
       }



    getUserData(email:string){

       this.http.get<any>('https://angular-assignment-2906b-default-rtdb.firebaseio.com/users.json')
      .pipe(map((res) => {
       
        for (const key in res) {
          const product_data = [];
          // if(res[key].email===email){

          
          if (res.hasOwnProperty(key)) {
            product_data.push({ ...res[key], id: key ,select:false })
          }
          console.log(product_data);
        }

      // }
        // }    
      
        
        // return product_data;
      }));


     }

   



  



  
}

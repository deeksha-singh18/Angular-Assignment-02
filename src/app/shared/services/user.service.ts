import { HttpClient } from "@angular/common/http"
import { AfterViewInit, Injectable } from "@angular/core"
import { pipe,map } from "rxjs";
import { UserData } from "src/app/model/userdata.model";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
  })
  

export class UserService{

    constructor(private http:HttpClient,private authService:AuthService){}
    userName:string="";

    getUserData(){

      return this.http.get<any>('https://angular-assignment-2906b-default-rtdb.firebaseio.com/users.json')
          .pipe(map((res) => {
           const product_data = [];
           for (const key in res) {
              if (res.hasOwnProperty(key)) {
                product_data.push({ ...res[key], id: key ,select:false })
              }
           }    
            //   console.log(product_data);
              
              return product_data;
            }));
    
    
           }

}


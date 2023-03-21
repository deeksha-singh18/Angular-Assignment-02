import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map } from "rxjs";
import { UserData } from "src/app/model/userdata.model";
import { AuthService } from "./auth.service";
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  userData: UserData[] = [];
  userValues: UserData;
  // userInfo = new Subject<UserData>;

  getUserData() {
    return this.http.get('https://angular-assignment-2906b-default-rtdb.firebaseio.com/users.json')
      .pipe(map((res) => {
        const user_data = [];
        const loggedInEmail = JSON.parse(localStorage.getItem('user')).email;

        for (const key in res) {
          if (res[key].email === loggedInEmail) {
            if (res.hasOwnProperty(key)) {
              user_data.push({ ...res[key], id: key, select: false })
            }
          }
        }
        return user_data;
      }));

  }



}


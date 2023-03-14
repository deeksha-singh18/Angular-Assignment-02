import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Setting } from "src/app/model/setting.model";

@Injectable({
    providedIn:'root'
})

export class SettingService{

    constructor(private http:HttpClient){}

    storeSettings(settingsData:Setting){
        return this.http.post<Setting>('https://angular-assignment-2906b-default-rtdb.firebaseio.com/settings.json',settingsData);
    }
  

    getSettings(){
      return this.http.get<Setting>('https://angular-assignment-2906b-default-rtdb.firebaseio.com/settings.json');
    }

    updateSettings(settingsData:Setting){
      return this.http.put<Setting>('https://angular-assignment-2906b-default-rtdb.firebaseio.com/settings.json',settingsData);
    }



}
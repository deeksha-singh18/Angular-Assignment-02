import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingService } from '../shared/services/setting.service';
import { Setting } from '../model/setting.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit {

  @ViewChild('settingForm') settingForm:NgForm;
  isEdit=true;
  isCreate=true;
  isProductSearch=true;
  isMultipleDelete=false;
  settingData:Setting;

  constructor(private settingService:SettingService,private router:Router){}

  ngOnInit(): void {
    this.settingService.getSettings()
    .subscribe(currSettings=>{
      this.isEdit=currSettings.isEdit;
      this.isCreate=currSettings.isCreate;
      this.isProductSearch=currSettings.isProductSearch;
      this.isMultipleDelete=currSettings.isMultipleDelete;

      console.log("Current settings => ",currSettings);
      
    })
    

    
  }


  onSubmit(){
    const currData=this.settingForm.value;
    console.log(currData);
    this.settingData={
    isEdit:currData.isEdit,
    isCreate:currData.isCreate,
    isProductSearch:currData.isProductSearch,
    isMultipleDelete:currData.isMultipleDelete,
    lastUpdatedTime:new Date()
    }  
    

    this.settingService.updateSettings(this.settingData)
    .subscribe(resData=>{
      console.log("Update Settings=>",resData);
      alert("Settings have been updated");
      console.log("Current settings have been updated");
      this.router.navigate(['/home']);
      
    });

   
    setTimeout(() => {
      // this.settingForm.reset();
      this.onReset();
     }, 2000);

     

  }


  onReset(){
    this.isEdit=true;
    this.isCreate=true;
    this.isProductSearch=true;
    this.isMultipleDelete=false;

  }
    
   


}

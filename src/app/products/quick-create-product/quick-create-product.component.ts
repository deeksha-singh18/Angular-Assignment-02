import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quick-create-product',
  templateUrl: './quick-create-product.component.html',
  styleUrls: ['./quick-create-product.component.css']
})


export class QuickCreateProductComponent {

  @ViewChild('form') form:NgForm;
  

  constructor(private router:Router,private productService:ProductService,private http:HttpClient,
    private location:Location){}

  onSubmit(){
    const productData=this.form.value;
    console.log(productData);
    

    this.productService.createProduct(productData)
    .subscribe(resData=>{
      console.log(resData);
      this.router.navigate(['/home']);
      

    });
    
  }

  onCancel() {
     if(confirm("Do you want to discard the changes?")){
      this.location.back();
      // this.router.navigate(['/home']);
     }
    
    else{
      // this.location.back();
      this.router.navigate(['/quick-create-product'])
    }
   
  }


}

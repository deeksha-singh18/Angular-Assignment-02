import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quick-create-product',
  templateUrl: './quick-create-product.component.html',
  styleUrls: ['./quick-create-product.component.css']
})


export class QuickCreateProductComponent {

  @ViewChild('form') form:NgForm;
  

  constructor(private router:Router,private productService:ProductService,private http:HttpClient){}

  onSubmit(){
    const productData=this.form.value;
    console.log(productData);
    

    this.productService.createProduct(productData)
    .subscribe(resData=>{
      console.log(resData);
      this.router.navigate(['/home']);
      

    });
    
  }

}

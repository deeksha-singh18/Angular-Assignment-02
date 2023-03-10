import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-service',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})

export class ProductsDetailsComponent implements OnInit {

  productId="";
  product:undefined | Product;

  constructor(private activateRoute:ActivatedRoute,private productService:ProductService,
    private router:Router){}

  ngOnInit(){

    this.productId=this.activateRoute.snapshot.paramMap.get('id');
   // this.product=this.productData.find(x =>x.id==this.productId);
    // console.log(this.product);
    this.productService.getProduct(this.productId)
    .subscribe(resData =>{
      this.product=resData;
      console.log(this.product);
      
    })
  }


  onEdit(){
    this.router.navigate(['/create-product',this.productId])

  }

  onRemove(){
    if(confirm("Do you want to remove it ?")==true){
      this.productService.deleteProduct(this.productId)
      .subscribe(resData =>{
        this.router.navigate(['/home'])
      })
    }
    

  }

}

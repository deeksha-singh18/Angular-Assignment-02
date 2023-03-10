import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/model/product.model';
import { Router } from '@angular/router';
import { filter, pipe } from 'rxjs';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})
export class ListOfProductsComponent implements OnInit {

  searchBarValue1="";
  searchBarValue2="";
  allowMultipleDelete=false;
  allowProductSearch=true;
  allowEdit=true;
  productData:Product[]=[];
  product:Product;
  selectedItems="";

  constructor(private productService:ProductService,private router:Router,
    private settingService:SettingService){}

  ngOnInit(): void {
   
    this.productService.getProductDetails()
    .subscribe(data =>{
      this.productData=data;
    })

    this.settingService.getSettings().
    subscribe(resData=>{
      this.allowMultipleDelete=resData.isMultipleDelete;
      this.allowProductSearch=resData.isProductSearch;
      this.allowEdit=resData.isEdit;
    })
    
  }

  onEdit(id:string){
    if(this.allowEdit){
      this.router.navigate(['/create-product',id]);
    }
    
  }

   
   onRemove(id:string){
    if (confirm("Do you want to remove it ?")==true){
      this.productService.deleteProduct(id)
    .subscribe(()=>{
      this.productService.getProductDetails()
      .subscribe((data)=>{
        this.productData=data;
      });
    })

    }
   
    
  }

  deleteAllProductsData(){
    this.productService.deleteAllProducts().subscribe(()=>{
      this.productData=[];
    })
  }


  onApiSearch(searchBarValue2:string){
    if(this.allowProductSearch){
      setTimeout(() => {
      return this.productService.getProductDetails()
        .subscribe(resData =>{
        const filteredData = resData.filter((data) => {
         data.name.toLowerCase().indexOf(this.searchBarValue2.toLowerCase())>-1 || data.heading.toLowerCase().indexOf(this.searchBarValue2.toLowerCase())>-1 
         || data.subheading.toLowerCase().indexOf(this.searchBarValue2.toLowerCase())>-1 ||
         data.tags.toLowerCase().indexOf(this.searchBarValue2.toLowerCase())>-1});
         
         this.productData=filteredData
       });
    }, 1000);
  }
  }





  

}

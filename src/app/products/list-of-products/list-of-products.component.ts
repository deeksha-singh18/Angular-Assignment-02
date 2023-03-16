import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/model/product.model';
import { Router } from '@angular/router';
import { map, fromEvent, pipe, debounceTime, distinctUntilChanged } from 'rxjs';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})


export class ListOfProductsComponent implements OnInit,AfterViewInit {

  searchBarValue1="";
  allowMultipleDelete=false;
  allowProductSearch=true;
  allowEdit=true;
  productData:Product[]=[];
  product:Product;
  allSelectedItems="";
  selectItem=""
  selectedItems=[];

  @ViewChild('searchBarValue2') searchValue:ElementRef;

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

  ngAfterViewInit(): void {
    
    const searchedData = fromEvent<any>(this.searchValue.nativeElement,'keyup')
    .pipe(map(event => event.target.value),
    debounceTime(1000),
    distinctUntilChanged())

    searchedData.subscribe(res =>{
      console.log(res);
      this.productService.searchedProducts(res)
      .subscribe((res:Product[]) =>{
        this.productData=res;
      })
      
    })
  }



  onEdit(id:string){
    if(this.allowEdit){
      this.router.navigate(['/create-product',id]);
    }
    
  }

   
   onRemove(id:string){
    if (confirm("Do you want to remove it ?")){
      this.productService.deleteProduct(id)
      .subscribe(()=>{
      this.productService.getProductDetails()
      .subscribe((data)=>{
       this.productData=data;
      });
    })

    }
   
    
  }

  onChecked(itemId:string){
   
      if(this.selectedItems.find(x => x === itemId)){
         this.selectedItems.splice(this.selectedItems.indexOf(itemId),1);
      }
      else{
       this.selectedItems.push(itemId);
      }
       console.log(this.selectedItems);
    
      
  }


  deleteSelectedItems(){
    if(confirm("Do you want to delete selected products ?")){
      for(let itemId of this.selectedItems){
         this.productService.deleteProduct(itemId)
         .subscribe(()=>{
         this.productService.getProductDetails()
         .subscribe(resData=>{
          this.productData=resData;
        })
      })
    }
     

    
  }
    

}

  deleteAllProductsData(){
    if(confirm("Do you want to delete all products list ?")){
       this.productService.deleteAllProducts().subscribe(()=>{
       this.productData=[];
    })
  }
  }


  



  

}

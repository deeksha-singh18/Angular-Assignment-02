import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/model/product.model";
import { map } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ProductService{

    constructor(private http:HttpClient){}

    createProduct(product:Product){
        return this.http.post<Product>(
            'https://angular-assignment-2906b-default-rtdb.firebaseio.com/products.json',product);
    }


    getProduct(id:string){
        return this.http.get<Product>('https://angular-assignment-2906b-default-rtdb.firebaseio.com/products/'+id+'.json');
    }


    updateProduct(id:string,product:Product){
        return this.http.put<Product>('https://angular-assignment-2906b-default-rtdb.firebaseio.com/products/' +id+'.json',product);
    }


    getProductDetails() {
        return this.http.get<{ [key: string]: Product }>('https://angular-assignment-2906b-default-rtdb.firebaseio.com/products.json')
        .pipe(map((res) => {
          const product_data = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              product_data.push({ ...res[key], id: key ,select:false })
            }
          }
          return product_data;
        }));
    }


    deleteProduct(id:string){
        return this.http.delete('https://angular-assignment-2906b-default-rtdb.firebaseio.com/products/' +id+ '.json');
    }

    
    deleteAllProducts(){
        return this.http.delete('https://angular-assignment-2906b-default-rtdb.firebaseio.com/products.json')
        
    }

    searchedProducts(item:string){
       
    //    const options = {params:new HttpParams().set('query',item)};
        return this.http.get('https://angular-assignment-2906b-default-rtdb.firebaseio.com/products.json')
        
    }

        

}


  
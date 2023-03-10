import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})


export class CreateProductComponent {


  form: FormGroup;
  updateMode = false;
  product: Product;
  updateMessage = "";
  productId = "";



  constructor(private productService: ProductService, private router: Router,
    private activateRoute: ActivatedRoute) { }


  ngOnInit() {
    this.form = new FormGroup({
      'productName': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'expiry': new FormControl(null, [Validators.required]),
      'stock': new FormControl(0, [Validators.required,Validators.pattern("^[0-9]*$")]),
      'heading': new FormControl(null, [Validators.maxLength(150)]),
      'subheading': new FormControl(null, [Validators.maxLength(160)]),
      // 'tags':new FormArray([],[Validators.maxLength(10)]),
      'tags': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.maxLength(250)])
    });



    this.productId = this.activateRoute.snapshot.paramMap.get('id');
    if (this.productId) {
      this.updateMode = true;
    }

    if (this.updateMode) {
      this.productService.getProduct(this.productId)
        .subscribe(resData => {
          this.product = resData;

          this.form.patchValue({
            productName: this.product.productName,
            expiry: this.product.expiry,
            stock: this.product.stock,
            heading: this.product.heading,
            subheading: this.product.subheading,
            tags: this.product.tags,
            description: this.product.description
          });
        });
    }



  }


  


  onSubmit() {
    console.log(this.form);
    const productData = this.form.value;

    if (this.updateMode) {
      this.productService.updateProduct(this.productId,productData)
        .subscribe(resData => {
          if (resData) {
            this.updateMessage = "Product has been updated";
          }
        });

      setTimeout(() => {
        this.form.reset();
        this.router.navigate(['/home'])
      }, 1000)
    }

    else {
      this.productService.createProduct(productData)
        .subscribe(resData => {
          console.log(resData);

        });

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    }


  }


  onCancel() {
    this.router.navigate(['/home']);
  }




}

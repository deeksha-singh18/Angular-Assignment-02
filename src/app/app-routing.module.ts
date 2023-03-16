import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ListOfProductsComponent } from './products/list-of-products/list-of-products.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { QuickCreateProductComponent } from './products/quick-create-product/quick-create-product.component';
import { SettingsComponent } from './settings/settings.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo:'/login-type', pathMatch:'full'},
  {path:'login-type',component:MainComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'main',component:NavbarComponent},
  {path:'home',component:ListOfProductsComponent},

  // {path:'create-product/:id',component:CreateProductComponent,canActivate:[AuthGuard]},
  // {path:'create-product',component:CreateProductComponent,canActivate:[AuthGuard]},
  // {path:'quick-create-product',component:QuickCreateProductComponent,canActivate:[AuthGuard]},
  // {path:'products-details/:id',component:ProductsDetailsComponent,canActivate:[AuthGuard]},
  // {path:'settings',component:SettingsComponent,canActivate:[AuthGuard]},

  {path:'create-product/:id',component:CreateProductComponent},
  {path:'create-product',component:CreateProductComponent},
  {path:'quick-create-product',component:QuickCreateProductComponent},
  {path:'products-details/:id',component:ProductsDetailsComponent},
  {path:'settings',component:SettingsComponent},
  {path:'**',component:NotFoundComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

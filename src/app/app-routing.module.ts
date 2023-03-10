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
import { HamburgerComponent } from './shared/components/navbar/hamburger/hamburger.component';
import { HeaderComponent } from './shared/components/navbar/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo:'/login-type', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'create-product/:id',component:CreateProductComponent},
  {path:'create-product',component:CreateProductComponent,},
  {path:'home',component:ListOfProductsComponent},
  {path:'quick-create-product',component:QuickCreateProductComponent},
  {path:'products-details/:id',component:ProductsDetailsComponent},
  {path:'login-type',component:MainComponent},
  {path:'settings',component:SettingsComponent},
  {path:'admin',component:AdminComponent},
  {path:'header',component:HeaderComponent},
  {path:'main',component:NavbarComponent},
  {path:'hamburger',component:HamburgerComponent},
  {path:'**',component:NotFoundComponent},
 
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarModule } from 'ng-sidebar';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlertComponent } from './login/alert/alert.component';
import { SettingsComponent } from './settings/settings.component';
import { ListOfProductsComponent } from './products/list-of-products/list-of-products.component';
import { QuickCreateProductComponent } from './products/quick-create-product/quick-create-product.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { HeaderComponent } from './shared/components/navbar/header/header.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { HamburgerComponent } from './shared/components/navbar/hamburger/hamburger.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SortPipe } from './sort.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    AlertComponent,
    SettingsComponent,
    ListOfProductsComponent,
    QuickCreateProductComponent,
    CreateProductComponent,
    ProductsDetailsComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    MainComponent,
    AdminComponent,
    HamburgerComponent,
    NavbarComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

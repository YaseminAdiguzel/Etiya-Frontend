import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { DashboardCategoryPageComponent } from './pages/dashboard-category-page/dashboard-category-page.component';
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { FilterProductByPricePipe } from './pipes/filter-product-by-price.pipe';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './components/products/products.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ButtonDirective } from './directives/button.directive';
import { DashboardProductsListComponent } from './components/dashboard-products-list/dashboard-products-list.component';
import { DashboardCategoryListComponent } from './components/dashboard-category-list/dashboard-category-list.component';
import { IfNotDirective } from './directives/if-not.directive';
import { UnlessDirective } from './directives/unless.directive';
import { HttpInterceptors } from './interceptor/http.interceptors';
import { OverlayLoadingComponent } from './components/overlay-loading/overlay-loading.component';
import { LoadingInterceptor } from './interceptor/loading.interceptors';
import { SharedModule } from './shared/shared.module';








@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    HomePageComponent,
    LoginPageComponent,
    LoadingSpinnerComponent,
    ProductFormComponent,
    ProductFormPageComponent,
    DashboardProductsPageComponent,
    CategoryFormComponent,
    DashboardCategoryPageComponent,
    CategoryFormPageComponent,
    CategoryListComponent,
    FilterProductPipe,
    FilterProductByPricePipe,
    ProductCardComponent,
    ProductsComponent,
    HighlightDirective,
    ButtonDirective,
    DashboardProductsListComponent,
    DashboardCategoryListComponent,
    FilterProductPipe,
    FilterProductByPricePipe,
    ButtonDirective,
    IfNotDirective,
    UnlessDirective,
    OverlayLoadingComponent
   
 
   
  ], // HTML tarafındaki angular bileşenlerini tanımlar
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
  ], // Angular modülleri import edeceğimiz yer
  //providers: [], // IoC Container'daki Dependency Injection'ları tanımlar

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptors, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
 ],
 
  bootstrap: [AppComponent], // Hangi bileşenin ilk açıldığında çalışacağını belirtir

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}

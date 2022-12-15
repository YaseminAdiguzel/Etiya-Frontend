import { RouterModule, Routes } from '@angular/router';

import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'category/:categoryId', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  
  {
    path: 'dashboard', // Grand Parent route
    children: [
      {
        path: 'products', // Parent route
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DashboardProductsPageComponent,
          },
          { path: 'add', component: ProductFormPageComponent }, //= dashboard/products/add
          { path: 'edit/:productId', component: ProductFormPageComponent },
        ],
      },
    ],
  },

  {
    path: 'dashboard', // Grand Parent route
    children: [
      {
        path: 'category', // Parent route
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CategoryFormComponent ,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

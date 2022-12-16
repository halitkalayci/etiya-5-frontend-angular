import { RouterModule, Routes } from '@angular/router';

import { DashboardProductsPageComponent } from './features/products/pages/dashboard-products-page/dashboard-products-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { ProductFormPageComponent } from './features/products/pages/product-form-page/product-form-page.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  {
    path: 'category/:categoryId',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

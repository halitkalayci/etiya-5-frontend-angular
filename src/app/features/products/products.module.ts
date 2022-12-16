import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FilterProductByPricePipe } from './pipes/filter-product-by-price.pipe';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';

@NgModule({
  declarations: [
    ProductFormPageComponent,
    ProductCardComponent,
    ProductFormComponent,
    ProductListComponent,
    FilterProductByPricePipe,
    FilterProductPipe,
    DashboardProductsPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    ProductFormPageComponent,
    FilterProductByPricePipe,
    FilterProductPipe,
    ProductListComponent,
  ],
})
export class ProductsModule {}

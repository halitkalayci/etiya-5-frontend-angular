import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CartSummaryComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CartModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'cart-summary',
    component: CartSummaryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}

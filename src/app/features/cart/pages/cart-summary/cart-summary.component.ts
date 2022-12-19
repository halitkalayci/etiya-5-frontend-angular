import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem';

@Component({
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscribeToCartService();
  }

  subscribeToCartService() {
    this.cartService.cartItemModel$.subscribe((response) => {
      this.cartItems = response;
    });
  }

  removeItem(cartItem: CartItem) {
    if (cartItem.id) this.cartService.removeState(cartItem.id);
  }
}

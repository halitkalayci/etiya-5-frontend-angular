import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartItem } from 'src/app/features/cart/models/cartItem';
import { CartService } from 'src/app/features/cart/services/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faCoffee = faCoffee;
  isAuthenticated: boolean = this.authService.isAuthenticated;
  navItems: any[] = [
    {
      label: 'Home',
      routerLink: '/',
      isRouterActiveExact: true,
    },
    {
      label: 'Sepet',
      routerLink: '/cart-summary',
      isRouterActiveExact: true,
    },
  ];
  cartItems: CartItem[] = [];
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addLoginIfNotAuthenticated();
    this.getCartItems();
  }
  addLoginIfNotAuthenticated() {
    if (!this.isAuthenticated) {
      this.navItems.push({
        label: 'Login',
        routerLink: '/login',
        isRouterActiveExact: true,
      });
    } else {
      // Kullanıcı giriş yapmıştır..
    }
  }

  getCartItems() {
    this.cartService.cartItems.subscribe((response) => {
      this.cartItems = response;
    });
  }

  get cartLength(): number {
    let length = this.cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity;
    }, 0);
    return length;
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}

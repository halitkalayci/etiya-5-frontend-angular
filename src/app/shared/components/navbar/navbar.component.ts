import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  navItems: any[] = [
    {
      label: 'Home',
      routerLink: '/',
      isRouterActiveExact: true,
    },
    {
      label: 'Login',
      routerLink: '/login',
      isRouterActiveExact: false,
    },
  ];
}

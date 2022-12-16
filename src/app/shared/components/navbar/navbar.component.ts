import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = this.authService.isAuthenticated;
  navItems: any[] = [
    {
      label: 'Home',
      routerLink: '/',
      isRouterActiveExact: true,
    },
  ];
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.addLoginIfNotAuthenticated();
  }
  addLoginIfNotAuthenticated() {
    if (!this.isAuthenticated) {
      this.navItems.push({
        label: 'Login',
        routerLink: '/login',
        isRouterActiveExact: true,
      });
    }
  }
}

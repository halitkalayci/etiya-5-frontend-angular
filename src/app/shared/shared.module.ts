import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [AlertComponent, NavbarComponent, LoginPageComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [AlertComponent, NavbarComponent],
})
export class SharedModule {}

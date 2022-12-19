import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { sharedReducers } from './store/shared.reducers';

@NgModule({
  declarations: [
    AlertComponent,
    NavbarComponent,
    LoginPageComponent,
    MainLayoutComponent,
    HighlightDirective,
    TodoItemComponent,
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StoreModule.forRoot(sharedReducers),
  ],
  exports: [
    AlertComponent,
    NavbarComponent,
    MainLayoutComponent,
    HighlightDirective,
  ],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryTableComponent } from './components/category-table/category-table.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryTableComponent],
  imports: [CommonModule, CategoriesRoutingModule],
})
export class CategoriesModule {}

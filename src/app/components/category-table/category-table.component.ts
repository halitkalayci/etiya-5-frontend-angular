import { CategoriesService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { GetListOptionsType } from 'src/app/models/get-list-options';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit {
  categories: Category[] = [];
  getOptions: GetListOptionsType;
  lastPage: boolean = false;
  constructor(private categoryService: CategoriesService) {}
  ngOnInit(): void {
    this.getOptions = { pagination: { page: 1, pageSize: 5 } };
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getList(this.getOptions).subscribe((response) => {
      if (!response || response.length <= 0) {
        this.lastPage = true;
        return;
      }
      this.categories = [...this.categories, ...response];
    });
  }

  showMore() {
    if (this.getOptions && this.getOptions.pagination)
      this.getOptions.pagination.page++;

    this.getCategories();
  }
}

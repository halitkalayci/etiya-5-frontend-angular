import { CategoriesService } from 'src/app/features/categories/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/features/categories/models/category';
import { GetListOptionsType } from 'src/app/core/models/get-list-options';

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

  getCategories(clearList: boolean = true) {
    this.categoryService.getList(this.getOptions).subscribe((response) => {
      if (!response || response.length <= 0) {
        this.lastPage = true;
      }
      if (clearList) {
        // Her yeni sayfada veriler temizlenir, sayfanın verileri listelenir.
        this.categories = response;
      } else {
        // Yeni sayfada önceki sayfaların verileri silinmez
        this.categories = [...this.categories, ...response];
      }
    });
  }

  showMore() {
    if (this.getOptions && this.getOptions.pagination)
      this.getOptions.pagination.page++;

    this.getCategories(false);
  }

  changePage(page: number) {
    if (page <= 0) page = 1;
    if (page > 3) page = 3;
    if (this.getOptions && this.getOptions.pagination)
      this.getOptions.pagination.page = page;

    this.getCategories(true);
  }
}

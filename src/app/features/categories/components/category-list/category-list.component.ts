import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CategoriesService } from 'src/app/features/categories/services/categories.service';
import { Category } from 'src/app/features/categories/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  title: string = 'Category List';
  //: ! Şuan undefined olduğu için kızma, daha sonra seni atacağım şeklinde söz vermiş oluyoruz.
  //: ? Bu özellik undefined olabilir demek.
  //: null için ? kullanamıyoruz, | null diye belirtmemiz gerekiyor.
  categories!: Category[];

  //# Encapsulation
  private _categoriesListItems: any[] = [{ label: 'All', value: null }];
  //# Getter
  get categoriesListItems(): any[] {
    if (this.categories === undefined) return this._categoriesListItems;

    // property
    return [
      ...this._categoriesListItems,
      ...this.categories.map((c) => {
        return { label: c.name, value: c.id };
      }),
    ];
  }
  //# Setter
  set categoriesListItems(value: any[]) {
    this._categoriesListItems = value;
  }
  // console.log(this.categoriesListItems); // Get
  // this.categoriesListItems = []; // Set

  //: private, public, protected
  //: private: sadece class içerisinde kullanılabilir.
  //: public: her yerden kullanılabilir.
  //: Default olarak herşey public'tir.
  //: protected: sadece class içerisinde ve class'ın inherit edildiği yerlerde kullanılabilir.
  public selectedCategoryId: number | null = null;

  // private activatedRoute: ActivatedRoute;
  //: IoC (Inversion of Control), referansların tutulduğu bir container'dır.
  //: Dependency Injection, IoC container'ın içerisindeki referansları kullanmamızı sağlayan bir mekanizmadır.
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService
  ) {
    //: constructor class oluşturulduğu an çalışır.
    // this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    //: ngOnInit() methodu component'in yerleştirildiği an çalışır.
    this.getSelectedCategoryIdFromRoute();
    this.getListCategories();
  }

  getListCategories() {
    this.categoriesService.getList().subscribe((response) => {
      this.categories = response;
    });
  }

  getSelectedCategoryIdFromRoute() {
    //* Observer Design Pattern
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId'] !== undefined)
        this.selectedCategoryId = Number(params['categoryId']);
    }); //* Callback
  }

  onSelectedCategory(categoryId: number | null): void {
    // if (category === null) this.selectedCategoryId = null;
    // else this.selectedCategoryId = category.id;

    //# Debugging
    //debugger; // breakpoint. Uygulama çalışma anında bu satıra geldiğinde uygulama durucak ve adım adım takip edebileceğimiz bir panel açılacak.

    //# ternary operator
    // this.selectedCategoryId = category === null ? null : category.id;

    //# optional chaining operator
    //: object?.id dediğimiz zaman, object null değilse ve id'e ulaşabiliyorsa id'sini alır, null ise null döner.

    //# nullish coalescing operator
    //: ?? operatörü ile sol taraf false (null, undefined, 0, "") ise sağ tarafı atar.
    // this.selectedCategoryId = categoryId ?? null; //: getSelectedCategoryIdFromRoute() methodu ile aynı işi yapıyor.

    // let routeByUrl = "/";
    // if (this.selectedCategoryId !== null) routeByUrl += "categories/" + this.selectedCategoryId;
    // this.router.navigateByUrl(routeByUrl, {queryParams: });

    const route = ['/'];
    if (categoryId !== null) route.push('category', categoryId!.toString());

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.router.navigate(route, { queryParams }); //= queryParams: queryParams
    });
  }

  isSelectedCategory(categoryId: number | null): boolean {
    return categoryId === this.selectedCategoryId;
  }
}

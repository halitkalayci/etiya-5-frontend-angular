import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { GetListOptionsType } from './../../models/get-list-options';
import { Pagination } from 'src/app/models/pagination';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productCardClass: string = 'card col-3 ms-3 mb-3';
  priceFilterType: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' = 'eq';
  products!: Product[];
  // selectedProductCategoryId: number | null = null;
  searchProductNameInput: string | null = null;

  pagination: Pagination = {
    page: 1,
    pageSize: 3,
  };
  lastPage?: number;
  filters: any = { productFilterPrice: 0 };
  //# Client Side Filter
  // get filteredProducts(): Product[] {
  //   let filteredProducts = this.products;
  //   if (!filteredProducts) return [];

  //   if (this.selectedProductCategoryId)
  //     filteredProducts = filteredProducts.filter(
  //       (p) => p.categoryId === this.selectedProductCategoryId
  //     );

  //   if (this.searchProductNameInput)
  //     filteredProducts = filteredProducts.filter(
  //       (p) =>
  //         p.name
  //           .toLowerCase()
  //           .includes(
  //             this.searchProductNameInput !== null
  //               ? this.searchProductNameInput.toLowerCase()
  //               : ''
  //           ) //: Non-null assertion operator: Sol tarafın null veya undefined olmadığı garanti edilir.
  //     );
  //   // {
  //   //   test: {
  //   //     test2: true
  //   //   }
  //   // }
  //   // object.test?.test2 //: Optional chaining: sağ tarafın obje içerisinde bulunmayabileceğini belirtiyoruz.

  //   return filteredProducts;
  // }
  isLoading: number = 0;
  errorAlertMessage: string | null = null;

  //: ActivatedRoute mevcut route bilgisini almak için kullanılır.
  //: Router yeni route bilgisi oluşturmak için kullanılır.
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.isLoading + 2;
    this.getCategoryIdFromRoute();
    this.getSearchProductNameFromRoute();
  }

  onSearchPriceChange(event: any) {
    if (this.filters.productFilterPrice == null) {
      this.filters.productFilterPrice = 0;
    }
  }
  addToCartClick(product: Product) {
    console.log(
      'ProductListComponentden sepete eklenmesi istenen ürün:',
      product
    );
  }

  getProductsList(options?: GetListOptionsType): void {
    this.isLoading = this.isLoading + 1;

    //: Subject: Observable'ın bir alt sınıfıdır. Subject'lerin bir özelliği ise, bir Subject üzerinden subscribe olunan herhangi bir yerden next() metodu çağrıldığında, o Subject üzerinden subscribe olan her yerde bu değişiklik görülebilir.
    this.productsService.getList(options).subscribe({
      next: (response) => {
        //: Etiya projelerinde pagination bilgileri body içerisinde gelmektedir. Direkt atamayı gerçekleştirebiliriz.
        // this.pagination.page = response.page;
        // this.pagination.pageSize = response.pageSize;
        // this.lastPage = response.lastPage;
        //: Json-server projelerinde pagination bilgileri header içerisinde gelmektedir. Header üzerinden atama yapmamız gerekmektedir. Bu yöntem pek kullanılmayacağı için, bu şekilde geçici bir çözüm ekleyebiliriz.
        if (response.length < this.pagination.pageSize) {
          if (response.length === 0 && this.pagination.page > 1)
            this.pagination.page = this.pagination.page - 1;
          this.lastPage = this.pagination.page;
        }

        this.products = response;
        if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      },
      error: () => {
        this.errorAlertMessage = "Server Error. Couldn't get products list.";
        if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  getCategoryIdFromRoute(): void {
    //: route params'ları almak adına activatedRoute.params kullanılır.
    this.activatedRoute.params.subscribe((params) => {
      this.resetPagination();

      if (params['categoryId']) {
        // this.selectedProductCategoryId = parseInt(params['categoryId']);
        this.filters['categoryId'] = parseInt(params['categoryId']);
      } else {
        // this.selectedProductCategoryId = null;
        // filters = { categoryId: 1 }
        if (this.filters['categoryId']) delete this.filters['categoryId']; //= filters = {}
        //: delete operatörü, object içerisindeki bir property'i silmek için kullanılır.
      }

      if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      if (this.isLoading === 0)
        this.getProductsList({
          pagination: this.pagination,
          filters: this.filters,
        });
    });
  }

  getSearchProductNameFromRoute(): void {
    //: query params'ları almak adına activatedRoute.queryParams kullanılır.
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // && this.searchProductNameInput == null
      if (
        queryParams['searchProductName'] &&
        queryParams['searchProductName'] !== this.searchProductNameInput
      ) {
        this.searchProductNameInput = queryParams['searchProductName'];
        this.filters['name_like'] = this.searchProductNameInput;
      }
      //# Defensive Programming
      if (
        queryParams['searchProductName'] === undefined &&
        this.searchProductNameInput !== null
      ) {
        this.searchProductNameInput = null;
        delete this.filters['name_like'];
      }

      if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      if (this.isLoading === 0)
        this.getProductsList({
          pagination: this.pagination,
          filters: this.filters,
        });
    });
  }

  isProductCardShow(product: Product): boolean {
    return product.discontinued == false;
  }

  onSearchProductNameChange(event: any): void {
    // this.searchProductNameInput = event.target.value; //: ngModel'imiz kendisi bu işlemi zaten gerçekleştiriyor.

    this.filters['name_like'] = this.searchProductNameInput;
    this.resetPagination();

    const queryParams: any = {};
    if (this.searchProductNameInput !== '')
      queryParams['searchProductName'] = this.searchProductNameInput;
    this.router.navigate([], {
      queryParams: queryParams,
    });
  }

  changePage(page: number): void {
    this.pagination.page = page;
    this.getProductsList({
      pagination: this.pagination,
      filters: this.filters,
    });
  }

  resetPagination(): void {
    this.pagination.page = 1;
    this.lastPage = undefined;
  }
}

// filter-product-by-price
// iki parametre alacak : price ve operator
// operator gt (greater than) gönderilirse price değeri gelen değerden yüksek ürünler
// opeartor lt (less than) gönderilirse price değeri gelen değerden düşük ürünler
// gte (greater than or equals to) price >=
// lte (less than or equals to) price <=
// eq (equals) => price ==
// ikinci parametre opsiyonel olacak, default olarak eq olacak

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productCardClass: string = 'card col-3 ms-3 mb-3';

  products!: Product[];
  selectedProductCategoryId: number | null = null;
  searchProductNameInput: string | null = null;
  get filteredProducts(): Product[] {
    let filteredProducts = this.products;
    if (!filteredProducts) return [];

    if (this.selectedProductCategoryId)
      filteredProducts = filteredProducts.filter(
        (p) => p.categoryId === this.selectedProductCategoryId
      );

    if (this.searchProductNameInput)
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name
            .toLowerCase()
            .includes(
              this.searchProductNameInput !== null
                ? this.searchProductNameInput.toLowerCase()
                : ''
            ) //: Non-null assertion operator: Sol tarafın null veya undefined olmadığı garanti edilir.
      );
    // {
    //   test: {
    //     test2: true
    //   }
    // }
    // object.test?.test2 //: Optional chaining: sağ tarafın obje içerisinde bulunmayabileceğini belirtiyoruz.

    return filteredProducts;
  }
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
    this.getProductsList();

    this.getCategoryIdFromRoute();
    this.getSearchProductNameFromRoute();
  }

  getProductsList() {
    this.isLoading = this.isLoading + 1;
    // Subject: Observable'ın bir alt sınıfıdır. Subject'lerin bir özelliği ise, bir Subject üzerinden subscribe olunan herhangi bir yerden next() metodu çağrıldığında, o Subject üzerinden subscribe olan her yerde bu değişiklik görülebilir.
    this.productsService.getList().subscribe({
      next: (response) => {
        // setTimeout(() => {
        this.products = response;
        this.isLoading = this.isLoading - 1;
        // }, 3000);
      },
      error: () => {
        this.errorAlertMessage = "Server Error. Couldn't get products list.";
        this.isLoading = this.isLoading - 1;
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  getCategoryIdFromRoute(): void {
    //: route params'ları almak adına activatedRoute.params kullanılır.
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId'])
        this.selectedProductCategoryId = parseInt(params['categoryId']);
      else this.selectedProductCategoryId = null;
      // "10.123" // float/double
      // "10" // int
    });
  }

  getSearchProductNameFromRoute(): void {
    //: query params'ları almak adına activatedRoute.queryParams kullanılır.
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // && this.searchProductNameInput == null
      if (
        queryParams['searchProductName'] &&
        queryParams['searchProductName'] !== this.searchProductNameInput
      )
        this.searchProductNameInput = queryParams['searchProductName'];
      //# Defensive Programming
      if (
        !queryParams['searchProductName'] &&
        this.searchProductNameInput !== null
      )
        this.searchProductNameInput = null;
    });
  }

  isProductCardShow(product: Product): boolean {
    return product.discontinued == false;
  }

  onSearchProductNameChange(event: any): void {
    // this.searchProductNameInput = event.target.value; //: ngModel'imiz kendisi bu işlemi zaten gerçekleştiriyor.

    const queryParams: any = {};
    if (this.searchProductNameInput !== '')
      queryParams['searchProductName'] = this.searchProductNameInput;
    this.router.navigate([], {
      queryParams: queryParams,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productToUpdate: Product | null = null;

  get isEditting(): boolean {
    return this.productToUpdate !== null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    // this.productForm = new FormGroup({
    //   name: new FormControl(''),
    // });
  }

  ngOnInit(): void {
    this.getProductIdFromRoute();
    this.createProductForm();
  }

  getProductIdFromRoute() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['productId']) this.getProductById(params['productId']);
    });
  }

  getProductById(productId: number) {
    throw new Error('Method not implemented.');
  }

  createProductForm(): void {
    this.productForm = this.formBuilder.group({
      supplierId: [0, Validators.min(1)],
      categoryId: [0, Validators.min(1)],
      quantityPerUnit: ['', Validators.required],
      unitPrice: [0, Validators.min(0)],
      unitsInStock: [0, Validators.min(0)],
      unitsOnOrder: ['', Validators.min(0)],
      reorderLevel: ['', Validators.min(0)],
      discontinued: [false],
      name: ['', [Validators.required, Validators.minLength(2)]], //: array, form control'ün parametrelerini temsil eder. 1. eleman default değer, 2. eleman validators
    });
  }

  onProductFormSubmit(): void {
    if (this.productForm.invalid) {
      this.toastrService.error('Please fill in the form correctly');
      return;
    }

    this.add();
  }

  add() {
    const request: Product = {
      //: Backend'in product add endpoint'ine gönderilecek olan request modeli.
      ...this.productForm.value,
      name: this.productForm.value.name.trim(), //= ...this.productForm.value ile gelen 'name' değerinin üzerin tekrar yazıyoruz (overwrite).
    };

    this.productsService.add(request).subscribe((response) => {
      this.toastrService.success('Product added successfully');
      console.log(response);
    });
  }
}

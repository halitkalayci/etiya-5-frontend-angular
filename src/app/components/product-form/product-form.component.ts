import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // this.productForm = new FormGroup({
    //   name: new FormControl(''),
    // });
  }
  ngOnInit(): void {
    this.createProductForm();
  }
  createProductForm() {
    this.productForm = this.formBuilder.group({
      name: [''],
      categoryId: [''],
    });
  }
}

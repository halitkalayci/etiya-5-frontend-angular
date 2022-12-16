import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/features/categories/services/categories.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  constructor(private categoryService: CategoriesService) {}
}

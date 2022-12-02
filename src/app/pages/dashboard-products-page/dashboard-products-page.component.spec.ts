import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductsPageComponent } from './dashboard-products-page.component';

describe('DashboardProductsPageComponent', () => {
  let component: DashboardProductsPageComponent;
  let fixture: ComponentFixture<DashboardProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProductsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

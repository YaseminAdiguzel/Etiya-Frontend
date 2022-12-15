import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductListComponent } from './dashboard-products-list.component';

describe('DashboardProductsListComponent', () => {
  let component: DashboardProductListComponent;
  let fixture: ComponentFixture<DashboardProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

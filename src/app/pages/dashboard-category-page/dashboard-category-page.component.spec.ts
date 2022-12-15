import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCategoryPageComponent } from './dashboard-category-page.component';

describe('DashboardCategoryPageComponent', () => {
  let component: DashboardCategoryPageComponent;
  let fixture: ComponentFixture<DashboardCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCategoryListComponent } from './dashboard-category-list.component';

describe('DashboardCategoryListComponent', () => {
  let component: DashboardCategoryListComponent;
  let fixture: ComponentFixture<DashboardCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

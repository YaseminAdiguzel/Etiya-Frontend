import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { Component } from '@angular/core';
import { GetListOptionsType } from 'src/app/models/get-list-options';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-dashboard-category-list.component',
  templateUrl: './dashboard-category-list.component.html',
  styleUrls: ['./dashboard-category-list.component.scss']
})
export class DashboardCategoryListComponent {

  categories!: Category[];
  errorAlertMessage: string | null = null;
  isLoading: number = 0;
  lastPage?: number;
  filters: any = {};
  pagination: Pagination = {
    page: 1,
    pageSize: 9,
  };
  searchCategoryNameInput: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.isLoading + 1;
    this.getSearchCategoryNameFromRoute();
  }

  getCategoryList(options?: GetListOptionsType): void {
    this.isLoading = this.isLoading + 1;
    this.categoryService.getList(options).subscribe({
      next: (response) => {
        if (response.length < this.pagination.pageSize) {
          if (response.length === 0 && this.pagination.page > 1)
            this.pagination.page = this.pagination.page - 1;
          this.lastPage = this.pagination.page;
        }

        this.categories = response;
        if(this.isLoading > 0)this.isLoading = this.isLoading - 1;
      },
      error: () => {
        this.errorAlertMessage = "Server Error. Couldn't get category list.";
        if(this.isLoading > 0) this.isLoading = this.isLoading - 1;
      },
      complete: () => {
        console.log('completed');
        if(this.isLoading > 0)this.isLoading = this.isLoading - 1;
      },
    });
  }


  
  getSearchCategoryNameFromRoute(): void {
  
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (
        queryParams['searchCategoryName'] &&
        queryParams['searchCategoryName'] !== this.searchCategoryNameInput
      ) {
        this.searchCategoryNameInput = queryParams['searchCategoryName'];
        this.filters['name_like'] = this.searchCategoryNameInput;
      }

      if (
        queryParams['searchCategoryName'] === undefined &&
        this.searchCategoryNameInput !== null
      ) {
        this.searchCategoryNameInput = null;
        delete this.filters['name_like'];
      }
      this.isLoading = this.isLoading - 1;

      if(this.isLoading === 0){
        this.getCategoryList({
          pagination: this.pagination,
          filters: this.filters,
        });
      }
    });
  }

  onSearchCategoryNameChange(event: any): void {

    this.filters['name_like'] = this.searchCategoryNameInput;
    this.resetPagination();

    const queryParams: any = {};
    if (this.searchCategoryNameInput !== '') 
      queryParams['searchCategoryName'] = this.searchCategoryNameInput;
    

    this.router.navigate([], {
      queryParams: queryParams,
    });

    
    this.getCategoryList({
      pagination: this.pagination,
      filters: this.filters,
    });
  }


  changePage(page: number) {
    this.pagination.page = page;
    this.getCategoryList({
      pagination: this.pagination,
      filters: this.filters,
    });
  }

  resetPagination(): void {
    this.pagination.page = 1;
    this.lastPage = undefined;
  }
}
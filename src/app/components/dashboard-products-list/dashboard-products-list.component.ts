import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { GetListOptionsType } from 'src/app/models/get-list-options';
import { Pagination } from 'src/app/models/pagination';
import { Products } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard-products-list.component',
  templateUrl: './dashboard-products-list.component.html',
  styleUrls: ['./dashboard-products-list.component.scss']
})
export class DashboardProductsListComponent {
  products!: Products[];
  errorAlertMessage: string | null = null;
  isLoading: number = 0;
  lastPage?: number;
  filters: any = {};
  pagination: Pagination = {
    page: 1,
    pageSize: 9,
  };
  searchProductNameInput: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.isLoading + 1;
    this.getSearchProductNameFromRoute();
  }

  getProductsList(options?: GetListOptionsType): void {
    this.isLoading = this.isLoading + 1;
    this.productsService.getList(options).subscribe({
      next: (response) => {
        if (response.length < this.pagination.pageSize) {
          if (response.length === 0 && this.pagination.page > 1)
            this.pagination.page = this.pagination.page - 1;
          this.lastPage = this.pagination.page;
        }

        this.products = response;
        if(this.isLoading > 0)this.isLoading = this.isLoading - 1;
      },
      error: () => {
        this.errorAlertMessage = "Server Error. Couldn't get products list.";
        if(this.isLoading > 0) this.isLoading = this.isLoading - 1;
      },
      complete: () => {
        console.log('completed');
        if(this.isLoading > 0)this.isLoading = this.isLoading - 1;
      },
    });
  }


  
  getSearchProductNameFromRoute(): void {
  
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (
        queryParams['searchProductName'] &&
        queryParams['searchProductName'] !== this.searchProductNameInput
      ) {
        this.searchProductNameInput = queryParams['searchProductName'];
        this.filters['name_like'] = this.searchProductNameInput;
      }

      if (
        queryParams['searchProductName'] === undefined &&
        this.searchProductNameInput !== null
      ) {
        this.searchProductNameInput = null;
        delete this.filters['name_like'];
      }
      this.isLoading = this.isLoading - 1;

      if(this.isLoading === 0){
        this.getProductsList({
          pagination: this.pagination,
          filters: this.filters,
        });
      }
    });
  }

  onSearchProductNameChange(event: any): void {

    this.filters['name_like'] = this.searchProductNameInput;
    this.resetPagination();

    const queryParams: any = {};
    if (this.searchProductNameInput !== '') 
      queryParams['searchProductName'] = this.searchProductNameInput;
    

    this.router.navigate([], {
      queryParams: queryParams,
    });

    
    this.getProductsList({
      pagination: this.pagination,
      filters: this.filters,
    });
  }


  changePage(page: number) {
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

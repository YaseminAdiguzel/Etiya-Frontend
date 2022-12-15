import { Pipe, PipeTransform } from '@angular/core';

import { Products } from '../models/product';

@Pipe({
  name: 'filterProductByPrice',
})
export class FilterProductByPricePipe implements PipeTransform {
  transform(
    product: Products[],
    price: number,
    filterprice: number,
    searchInput: string,
    discontinued: boolean,
    supplierId: number,
  ): Products[] {
    let filteredProducts: Products[] = product;

    if (searchInput != '') {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (price != 0) {
      filteredProducts = filteredProducts.filter((p) =>
        filterprice == 0
          ? p.unitPrice == price
          : filterprice == 1
          ? p.unitPrice > price
          : filterprice == 2
          ? p.unitPrice < price
          : filterprice == 3
          ? p.unitPrice >= price
          : filterprice == 4
          ? p.unitPrice <= price
          : p.unitPrice == price
      );
    }

    if (discontinued != false) {
      filteredProducts = filteredProducts.filter((p) => p.discontinued == false);
    }

    if (supplierId != 0) {
      filteredProducts = filteredProducts.filter((p) => p.supplierId == supplierId);
    }

    return filteredProducts;
  }
}
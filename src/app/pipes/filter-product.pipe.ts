import { Pipe, PipeTransform } from '@angular/core';

import { Products } from '../models/product';

@Pipe({
  name: 'filterProduct',
})
export class FilterProductPipe implements PipeTransform {
  transform(product: Products[], name: string): Products[] {
    let filteredProducts = product.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    
    return filteredProducts;
  }
}
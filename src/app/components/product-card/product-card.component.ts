import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Products } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!:Products;
  @Output() onAddToCartClick = new EventEmitter<Products>();

  condition = false;
  showInput = false
  show = false;

  addToCartClick() {
    this.onAddToCartClick.emit(this.product);
  }
}

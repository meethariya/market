import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartSuccessEmitter: EventEmitter<any> = new EventEmitter();
  
  successEmit() {
    this.addToCartSuccessEmitter.emit();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartEmitter: EventEmitter<{status: boolean; message: string}> = new EventEmitter();

  successEmit(data: {status: boolean; message: string}) {
    this.addToCartEmitter.emit(data);
  }

  floatToInt(rating:number):number{
    return Math.floor(rating);
  }
}

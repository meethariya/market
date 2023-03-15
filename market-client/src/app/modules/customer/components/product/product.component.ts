import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfStroke as halfStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartSuccessEmitter: EventEmitter<any> = new EventEmitter();
  
  fullStar = fullStar;
  emptyStar = emptyStar;
  halfStar = halfStar;

  successEmit() {
    this.addToCartSuccessEmitter.emit();
  }

  floatToInt(rating:number):number{
    return Math.floor(rating);
  }
}

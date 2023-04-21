import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { StarRatingComponent } from 'src/app/modules/product/components/star-rating/star-rating.component';
import { environment } from 'src/environments/environment';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { CustomerHomeComponent } from '../customer-home/customer-home.component';

/**
 * Product component. Individual product contains add to cart option, display Stars.  
 * Emits status and message when product is added to cart(success/failure).  
 * @see {@link CustomerHomeComponent}, {@link AddToCartComponent}, {@link StarRatingComponent}
 */
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent {
  @Input() product!: Product;   // Product input from {@link CustomerHomeComponent}
  @Output() addToCartEmitter: EventEmitter<{status: boolean; message: string}> = new EventEmitter();
  seperator = environment.seperator;      // seperator based on OS
  /**
   * Emits status and message as it is from {@link AddToCartComponent} to {@link CustomerHomeComponent}.  
   * @param data 
   * @returns `void`
   */
  successEmit(data: {status: boolean; message: string}): void {
    this.addToCartEmitter.emit(data);
  }
}

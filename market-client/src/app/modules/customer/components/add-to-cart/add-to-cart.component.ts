import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faCartPlus,
  faMinus,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from '../../services/customer.service';
import { ProductComponent } from '../product/product.component';

/**
 * AddToCart Component. This component is responsible for **adding products** to the cart.  
 * It can set the quantity using icon buttons.  
 * Takes `product ID` as input.  
 * Emits `message` for toast for both success and error.
 * 
 * @see {@link ProductComponent}
 */
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styles: [],
})
export class AddToCartComponent {
  @Input() productId!: number; // Accepts Product Id from parent
  @Output() cartEmitter: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter(); // Emits cart added or not status & message

  constructor(private customerService: CustomerService) {}

  showQuantity: boolean = false; // When true shows +/- button and quantity value.
  quantity: number = 1; // quantity modified using ngModel

  cancel = faXmark; // Cancel Icon
  check = faCartPlus; // Cart + Icon
  plus = faPlus; // + Icon
  minus = faMinus; // - Icon

  /**
   * This function is called when {@link check} button is clicked.
   * It sets productId using {@link productId}, quantity using {@link quantity} and submits to
   * {@link CustomerService.addToCart()}.  
   * On successful add to cart, emits `success message` , otherwise emits `error message` using
   * {@link cartEmitter}.
   */
  addToCart(): void {
    // preparing form data
    let cartData: FormData = new FormData();
    cartData.set('productId', this.productId.toString());
    cartData.set('quantity', this.quantity.toString());

    this.customerService.addToCart(cartData).subscribe({
      next: (id) =>
        // success
        this.cartEmitter.emit({
          status: true,
          message: 'Product has been successfully added to your cart',
        }),
      error: (err) =>
        // fail
        this.cartEmitter.emit({
          status: false,
          message: err.error,
        }),
    });
    // closes option for +/- and quantity buttons
    document.getElementById('close' + this.productId)!.click();
  }
}

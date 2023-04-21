import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartList } from 'src/app/models/cart-list';
import { environment } from 'src/environments/environment';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styles: [],
})
export class CartItemComponent {
  @Input() item!: CartList;               // Cart Item given as input by parent
  @Output() deleteFromCart: EventEmitter<{
    status: boolean;
    message: string;
    item?: CartList;
  }> = new EventEmitter();                // Emits status and message when item is deleted
  @Output() modifyCartQuantity: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();                // Emits status and message when quantity is changed

  plus = faPlus;                          // Plus Icon
  minus = faMinus;                        // Minus Icon
  trash = faTrash;                        // Trash Icon
  seperator = environment.seperator;      // seperator based on OS
  constructor(private customerService: CustomerService) {}

  /**
   * Increases or decreases quantity of cart item by 1.  
   * Emits status and message on success as well as error to start toast using {@link modifyCartQuantity}.  
   * {@link CustomerService.cartItemQuantityEditor()} does all the work.
   * 
   * @param quantityDiff 
   * @returns `void`
   */
  cartItemQuantityEditor(quantityDiff: number): void {
    if (this.item.quantity <= 0) return;

    // modify quantity
    this.item.quantity += quantityDiff;

    this.customerService
      .cartItemQuantityEditor(this.item.id, quantityDiff)
      .subscribe({
        next: (item) => {
          // modify item
          this.item = item;
          // emit success change
          this.modifyCartQuantity.emit({
            status: true,
            message:
              this.item.product.name +
              ' quantity modified to ' +
              this.item.quantity,
          });
        },
        error: (err) =>
          // emit fail change 
          this.modifyCartQuantity.emit({
            status: false,
            message: err.error,
          }),
      });
  }

  /**
   * Remove cart item from the cart list.  
   * Emits status and message on success as well as error to start toast {@link deleteFromCart} . 
   * Emits **Cart item** as well on success.  
   * @returns void
   */
  removeFromCart(): void {
    this.customerService.removeCartitem(this.item.id).subscribe({
      next: (data) =>
        this.deleteFromCart.emit({
          status: true,
          message: 'Item removed from cart',
          item: this.item,
        }),
      error: (err) =>
        this.deleteFromCart.emit({ status: false, message: err.error }),
    });
  }
}

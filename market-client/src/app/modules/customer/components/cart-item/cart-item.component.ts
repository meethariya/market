import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartList } from 'src/app/models/cart-list';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styles: [],
})
export class CartItemComponent {
  @Input() item!: CartList;
  @Output() deleteFromCart: EventEmitter<{
    status: boolean;
    message: string;
    item?: CartList;
  }> = new EventEmitter();
  @Output() modifyCartQuantity: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();

  plus = faPlus;
  minus = faMinus;
  trash = faTrash;

  constructor(private customerService: CustomerService) {}

  cartItemQuantityEditor(quantityDiff: number) {
    if (this.item.quantity <= 0) return;

    this.item.quantity += quantityDiff;

    this.customerService
      .cartItemQuantityEditor(this.item.id, quantityDiff)
      .subscribe({
        next: (item) => {
          this.item = item;
          this.modifyCartQuantity.emit({
            status: true,
            message:
              this.item.product.name +
              ' quantity modified to ' +
              this.item.quantity,
          });
        },
        error: (err) =>
          this.modifyCartQuantity.emit({
            status: false,
            message: err.error,
          }),
      });
  }

  removeFromCart() {
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

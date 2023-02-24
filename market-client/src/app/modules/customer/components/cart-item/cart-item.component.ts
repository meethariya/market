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
  @Output() deleteFromCart: EventEmitter<CartList> = new EventEmitter();

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
        next: (item) => (this.item = item),
        error: (err) => console.log(err),
      });
  }

  removeFromCart(){
    this.customerService.removeCartitem(this.item.id).subscribe({
      next: (data) => this.deleteFromCart.emit(this.item),
      error: (err) => console.log(err)
    });
  }
}

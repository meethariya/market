import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faCartPlus,
  faMinus,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styles: [],
})
export class AddToCartComponent {
  @Input() productId!: number;
  @Output() cartEmitter: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();

  constructor(private customerService: CustomerService) {}

  showQuantity: boolean = false;
  quantity: number = 1;

  cancel = faXmark;
  check = faCartPlus;
  plus = faPlus;
  minus = faMinus;

  addToCart() {
    let cartData: FormData = new FormData();
    cartData.set('productId', this.productId.toString());
    cartData.set('quantity', this.quantity.toString());

    this.customerService.addToCart(cartData).subscribe({
      next: (id) =>
        this.cartEmitter.emit({
          status: true,
          message: 'Product has been successfully added to your cart',
        }),
      error: (err) =>
        this.cartEmitter.emit({
          status: false,
          message: err.error,
        }),
    });
    
    document.getElementById('close' + this.productId)!.click();
  }
}

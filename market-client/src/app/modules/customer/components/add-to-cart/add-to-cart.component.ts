import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styles: [],
})
export class AddToCartComponent {
  @Input() productId!: number;
  @Output() cartSuccessEmitter: EventEmitter<any> = new EventEmitter();

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
      next: (id) => {console.log(id);this.cartSuccessEmitter.emit()},
      error: (err) => console.log(err),
    });
  }
}

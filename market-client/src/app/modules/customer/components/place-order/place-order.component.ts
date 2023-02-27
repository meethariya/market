import { Component, OnInit } from '@angular/core';
import { CartList } from 'src/app/models/cart-list';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styles: [],
})
export class PlaceOrderComponent implements OnInit {
  cart!: CartList[];
  customer!: Customer;

  payment: string = 'UPI';
  failedOrder: boolean = false;
  total: number = 0;
  orderSuccess: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getProfile().subscribe({
      next: (c) => (this.customer = c),
      error: (err) => console.log(err),
    });

    this.customerService.getCart().subscribe({
      next: (data: CartList[]) => {
        this.cart = data;
        this.cart.forEach((i) => (this.total += i.product.price * i.quantity));
      },
      error: (err) => console.log(err),
    });
  }

  order() {
    let formData: FormData = new FormData();
    formData.set('payment', this.payment);
    this.customerService.placeOrder(formData).subscribe({
      next: (id) => {
        console.log(id);
        this.orderSuccess = true;
      },
      error: (err) => {
        console.log(err.error);
        this.failedOrder = true;
      },
    });
    this.cart = [];
    this.total = 0;
  }
}

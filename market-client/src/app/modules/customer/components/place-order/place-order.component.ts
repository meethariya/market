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

  payment: string = "UPI";
  failedOrder: boolean = false;
  total: number = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getProfile().subscribe({
      next: (c) => this.customer = c,
      error: (err) => console.log(err)
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
    console.log('Order');
  }
}

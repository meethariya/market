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

  payment!: string;
  paymentOptions = [
    { id: 'UPI', name: 'UPI' },
    { id: 'NetBanking', name: 'NetBanking' },
    { id: 'COD', name: 'Cash On Delivery' },
  ];

  failedOrder: boolean = false;
  failedMessage: string = "Unable to place Order, Please try again later."
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
    if(this.payment!=null)
      formData.set('payment', this.payment);
    this.customerService.placeOrder(formData).subscribe({
      next: (id) => {
        this.orderSuccess = true;
        this.cart = [];
        this.total = 0;
        this.payment = '';
      },
      error: (err) => {
        console.log(err);
        this.failedMessage = err.error
        this.failedOrder = true;
      },
    });
  }
}

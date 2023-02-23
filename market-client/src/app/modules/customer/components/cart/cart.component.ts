import { Component, OnInit } from '@angular/core';
import { CartList } from 'src/app/models/cart-list';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [],
})
export class CartComponent implements OnInit {
  cart: CartList[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCart().subscribe({
      next: (data: CartList[]) => (this.cart = data),
      error: (err) => console.log(err),
    });
  }
}

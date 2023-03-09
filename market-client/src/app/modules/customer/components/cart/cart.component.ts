import { Component, OnInit } from '@angular/core';
import { CartList } from 'src/app/models/cart-list';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  p: number = 1;
  cart: CartList[] = [];
  itemRemoved: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCart().subscribe({
      next: (data: CartList[]) => (this.cart = data),
      error: (err) => console.log(err),
    });
  }

  removeItem(item: CartList) {
    this.cart = this.cart.filter((i) => i.id !== item.id);
    this.itemRemoved = true;
  }
}

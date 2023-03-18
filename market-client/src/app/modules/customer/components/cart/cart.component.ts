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

  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCart().subscribe({
      next: (data: CartList[]) => (this.cart = data),
      error: (err) => this.toastModifier(false, err.error),
    });
  }

  removeItem(data: { status: boolean; message: string; item?: CartList }) {
    if (data.status)
      this.cart = this.cart.filter((i) => i.id !== data.item!.id);
    this.toastModifier(data.status, data.message);
  }

  modifyCartQuantity(data: { status: boolean; message: string }) {
    this.toastModifier(data.status, data.message);
  }

  toastModifier(status: boolean, message: string) {
    if (status) {
      this.toastTitle = 'Success';
      this.toastColorClass = 'success';
    } else {
      this.toastTitle = 'Failed';
      this.toastColorClass = 'danger';
    }
    this.toastMessage = message;
    this.toastReady = true;
  }
}

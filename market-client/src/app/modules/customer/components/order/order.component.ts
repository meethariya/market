import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class OrderComponent implements OnInit {
  p: number = 1;
  allOrders: Order[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getOrder().subscribe({
      next: (data) => (this.allOrders = data),
      error: (err) => console.log(err),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ManagerService } from '../../services/manager.service';

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
  order: Order[] = [];

  constructor(private managerService: ManagerService) {}

  ngOnInit() {
    this.managerService.getAllOrders().subscribe({
      next: (data) => (this.order = data),
      error: (err) => console.log(err),
    });
  }
}

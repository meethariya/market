import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent implements OnInit {
  order: Order[] = [];

  constructor(private managerService: ManagerService) {}

  ngOnInit() {
    this.managerService.getAllOrders().subscribe({
      next: (data) => (this.order = data),
      error: (err) => console.log(err),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent implements OnInit {
  allOrders: Order[] = [];

  constructor(private customerService: CustomerService){}

  ngOnInit(): void {
    this.customerService.getOrder().subscribe({
      next:(data) => this.allOrders = data,
      error:(err) => console.log(err)
    });
  }
}

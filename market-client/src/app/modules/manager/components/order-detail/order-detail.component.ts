import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [],
})
export class OrderDetailComponent implements OnInit {
  @Input() order!: Order;
  age!: number;
  constructor() {}
  ngOnInit(): void {
    this.age = moment().diff(this.order.customer.dob, 'years');
  }

  switchPage(id:number){
    document.getElementById("closeModal"+id)?.click();
  }
}

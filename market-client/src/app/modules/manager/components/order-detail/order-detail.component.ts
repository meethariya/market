import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Order } from 'src/app/models/order';
import { OrderComponent } from '../order/order.component';
/**
 * OrderDetail component.
 * It shows all the order details inclusing customer's profile.  
 * Uses Moment.js to calculate age.
 * @see {@link OrderComponent}
 */
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [],
})
export class OrderDetailComponent implements OnInit {
  @Input() order!: Order;       // Order details input by parent
  age!: number;                 // Age of the customer
  
  /**
   * Calculate age of the customer.
   */
  ngOnInit(): void {
    this.age = moment().diff(this.order.customer.dob, 'years');
  }

  /**
   * Close detail modal when page is switched.
   * @param id 
   * @returns `void`
   */
  switchPage(id:number): void {
    document.getElementById("closeModal"+id)?.click();
  }
}

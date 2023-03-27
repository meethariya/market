import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ManagerService } from '../../services/manager.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

/**
 * Order Component.
 * Shows manager list of orders by all the customers.  
 * Table can be sorted based on column fields.  
 * Each Order can be displayed in detail using {@link OrderDetailComponent}.  
 * App Route Link: `/manager/order`
 */
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
    `
    /* pagination */
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class OrderComponent implements OnInit {
  p: number = 1;                      // pagination page number
  order: Order[] = [];                // List of order
  fixedOrder: Order[] = [];           // List of fixed order
  orderVariable: string = "id";       // Default order table sort field
  orderReverse:boolean = true;        // Sort order by ascending/descending
  sortIcon = faSort;                  // Sort Icon

  constructor(private managerService: ManagerService) {}

  /**
   * Fetches all order from {@link ManagerService.getAllOrders()}.  
   * @returns `void`
   */
  ngOnInit(): void {
    this.managerService.getAllOrders().subscribe({
      next: (data) => {this.order = data; this.fixedOrder=data;},
      error: (err) => console.log(err),
    });
  }

  /**
   * Sort order table by the specified column {@link value}.  
   * Alter {@link orderReverse}.
   * @param value 
   * @returns `void`
   */
  sortBy(value:string): void {
    this.orderVariable = value;
    this.orderReverse = !this.orderReverse;
  }

  /**
   * This methid is called by the Order Filter emitter.  
   * It Filters out orders by year.
   * @param modifiedOrderList 
   */
  orderFilter(modifiedOrderList: Order[]){
    this.order = modifiedOrderList;
  }
}

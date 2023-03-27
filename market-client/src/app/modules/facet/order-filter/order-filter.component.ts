import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderComponent } from '../../customer/components/order/order.component';
import { OrderComponent as allOrders } from '../../manager/components/order/order.component';
/**
 * Order Filter Component.
 * This component filters the list of orders by their purchase year.
 * Used by Customer {@link OrderComponent} and Manager {@link allOrders}
 */
@Component({
  selector: 'app-order-filter',
  template: `
    <!-- Order Filter -->
    <div class="d-inline-flex p-2 my-2">
      <label for="orderFilterMenu" class="form-label me-2 mt-1"
        >Order Year</label
      >
      <ng-select
        [items]="dropDownOptions"
        bindLabel="name"
        bindValue="id"
        name="orderYear"
        placeholder="Order Year"
        id="orderFilterMenu"
        (change)="onChange($event)"
      >
      </ng-select>
    </div>
  `,
  styles: [],
})
export class OrderFilterComponent {
  @Input() allOrders!: Order[]; // modifiable order list from parent
  @Input() fixedOrders!: Order[]; // fixed order list from parent
  @Output() orderEmitter: EventEmitter<Order[]> = new EventEmitter(); // emit new order list

  dropDownOptions: { id: number; name: string }[] = []; // dropdown options

  /**
   * Fill in the dropdown options using current year-0,1,2, older and all orders
   */
  constructor() {
    // current year-0, 1 and 2
    let currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.dropDownOptions.push({ id: i, name: (currentYear - i).toString() });
    }
    // older
    this.dropDownOptions.push({ id: 3, name: 'Older' });
    // all
    this.dropDownOptions.push({ id: 4, name: 'All Orders' });
  }

  /**
   * This method is called when the drop down value is changed.  
   * It filters only the orders of the selected year and emits the modfied order list.
   * 
   * @param event
   * @returns `void`
   */
  onChange(event: { id: number; name: string }): void {
    if (event == null) return;
    switch (event.id) {
      // same logic for all year values
      case 0:
      case 1:
      case 2:
        this.allOrders = this.fixedOrders.filter(
          (o) => new Date(o.timestamp).getFullYear() === Number(event.name)
        );
        break;
      // logic for orders older than 2 years
      case 3:
        this.allOrders = this.fixedOrders.filter(
          (o) =>
            new Date(o.timestamp).getFullYear() < new Date().getFullYear() - 2
        );
        break;
      // logic for all orders
      case 4:
        this.allOrders = this.fixedOrders;
        break;
      default:
        break;
    }
    // emit order list
    this.orderEmitter.emit(this.allOrders);
  }
}

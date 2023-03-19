import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';
import { ManagerHomeComponent } from '../manager-home/manager-home.component';

/**
 * Inventory Item Component.
 * It shows details of each inventory item, from list of inventory.  
 * Emits toast status and message when inventory stock is modified.  
 * @see {@link ManagerHomeComponent}
 */
@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styles: [],
})
export class InventoryItemComponent {
  @Input() item!: Inventory; // Inventory item input from parent component
  // emit toast status and message
  @Output() stockModifyEmitter: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();

  /**
   * It Updates quantity of the inventory item stock, also modifies import date.  
   * It emits status and message as it is from child component to its parent component.  
   * @param data
   * @returns `void`
   */
  modifyInventoryQuantity(data: {
    status: boolean;
    message: string;
    quantity?: number;
  }): void {
    if (data.status) {
      // if toast is a success
      this.item.quantity += data.quantity!;
      // if quantity is +ve, meaning stock added so modify import date.
      // if quantity is -ve, meaning stock is reduced
      if (data.quantity! > 1) this.item.lastImportDate = new Date();
    }
    // emit
    this.stockModifyEmitter.emit({
      status: data.status,
      message: data.message,
    });
  }
}

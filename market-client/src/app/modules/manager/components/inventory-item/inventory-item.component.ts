import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styles: [],
})
export class InventoryItemComponent {

  @Input() item!: Inventory;
  @Output() stockModifyEmitter: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();

  modifyInventoryQuantity(data: {
    status: boolean;
    message: string;
    quantity?: number;
  }) {
    if (data.status) {
      this.item.quantity += data.quantity!;
      if (data.quantity! > 1) this.item.lastImportDate = new Date();
    }
    this.stockModifyEmitter.emit({
      status: data.status,
      message: data.message,
    });
  }
}

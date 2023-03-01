import { Component, Input } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styles: [
  ]
})
export class InventoryItemComponent {
  successAdded: boolean = false;
  failAdded: boolean = false;

  @Input() item!: Inventory;
  
  successAddedFunction(q:number){
    this.successAdded = true;
    this.item.quantity+=q;
  }
}

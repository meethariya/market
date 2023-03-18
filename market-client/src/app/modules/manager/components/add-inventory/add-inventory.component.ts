import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styles: [],
})
export class AddInventoryComponent {
  @Input() item!: Inventory;
  @Input() remove!: boolean;
  @Output() modifyInventoryEmitter: EventEmitter<{
    status: boolean;
    message: string;
    quantity?: number;
  }> = new EventEmitter();

  quantity: number = 1;
  addOrRemove: boolean = true;

  constructor(private managerService: ManagerService) {}

  addItem(): void {
    let formData = new FormData();
    formData.set('id', this.item.product.id.toString());
    formData.set('quantity', this.quantity.toString());

    this.managerService.addInventory(formData).subscribe({
      next: (data) =>
        this.modifyInventoryEmitter.emit({
          status: true,
          message:
            this.quantity +
            ' unit added to stock. Total stock available: ' +
            (this.item.quantity + this.quantity),
          quantity: this.quantity,
        }),
      error: (err) =>
        this.modifyInventoryEmitter.emit({ status: false, message: err.error }),
    });
    document.getElementById('close' + this.item.product.id)!.click();
  }

  reduceItem(): void {
    let formData = new FormData();
    formData.set('id', this.item.product.id.toString());
    formData.set('quantity', this.quantity.toString());

    this.managerService.reduceInventory(formData).subscribe({
      next: (data) => this.modifyInventoryEmitter.emit({
        status: true,
        message:
          this.quantity +
          ' unit reduced from stock. Total stock available: ' +
          (this.item.quantity - this.quantity),
        quantity: this.quantity*-1,
      }),
      error: (err) => this.modifyInventoryEmitter.emit({ status: false, message: err.error }),
    });
    document.getElementById('close' + this.item.product.id)!.click();
  }

  modifySwitch(event: Event) {
    this.addOrRemove = (event.target as HTMLInputElement).checked;
  }

  modifyItem() {
    this.addOrRemove ? this.addItem() : this.reduceItem();
  }
}

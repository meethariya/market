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
  @Output() successAddEmiiter: EventEmitter<any> = new EventEmitter();
  @Output() failAddEmiiter: EventEmitter<void> = new EventEmitter();
  quantity: number = 1;

  constructor(private managerService: ManagerService) {}

  addItem(): void {
    let formData = new FormData();
    formData.set('id', this.item.product.id.toString());
    formData.set('quantity', this.quantity.toString());

    this.managerService.addInventory(formData).subscribe({
      next: (data) => this.successAddEmiiter.emit(this.quantity),
      error: (err) => this.failAddEmiiter.emit(),
    });
    document.getElementById('close'+this.item.product.id)!.click();
  }
}

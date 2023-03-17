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
  @Output() successAddEmiiter: EventEmitter<any> = new EventEmitter();
  @Output() failAddEmiiter: EventEmitter<void> = new EventEmitter();
  @Output() successRemoveEmiiter: EventEmitter<any> = new EventEmitter();
  @Output() failRemoveEmiiter: EventEmitter<void> = new EventEmitter();
  quantity: number = 1;
  addOrRemove: boolean = true;

  constructor(private managerService: ManagerService) {}

  addItem(): void {
    let formData = new FormData();
    formData.set('id', this.item.product.id.toString());
    formData.set('quantity', this.quantity.toString());

    this.managerService.addInventory(formData).subscribe({
      next: (data) => this.successAddEmiiter.emit(this.quantity),
      error: (err) => this.failAddEmiiter.emit(),
    });
    document.getElementById('close' + this.item.product.id)!.click();
  }

  reduceItem(): void {
    let formData = new FormData();
    formData.set('id', this.item.product.id.toString());
    formData.set('quantity', this.quantity.toString());

    this.managerService.reduceInventory(formData).subscribe({
      next: (data) => this.successRemoveEmiiter.emit(this.quantity),
      error: (err) => this.failRemoveEmiiter.emit(),
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

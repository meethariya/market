import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';
import { ManagerService } from '../../services/manager.service';
import { InventoryItemComponent } from '../inventory-item/inventory-item.component';

/**
 * AddInventory Component.
 * This component contains modal to give manager option to increase/decrease inventory stock.
 * @see {@link InventoryItemComponent}
 */
@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styles: [],
})
export class AddInventoryComponent {
  @Input() item!: Inventory;              // Inventory item input by parent.
  
  // Emit status and message to parent after altering stock quantity.
  @Output() modifyInventoryEmitter: EventEmitter<{
    status: boolean;
    message: string;
    quantity?: number;
  }> = new EventEmitter();

  quantity: number = 1;                   // default quantity
  addOrRemove: boolean = true;            // whether to add or remove

  constructor(private managerService: ManagerService) {}

  /**
   * When the add/remove switch is **checked**, this method is called by {@link modifyItem}.  
   * Submits form using {@link ManagerService.addInventory()}.  
   * Modify item quantity and emits to parent for toast on success/failure.  
   * Closes modal.
   * @returns `void`
   */
  addItem(): void {
    // sets form
    let formData = new FormData();
    formData.set('id', this.item.product.id.toString());
    formData.set('quantity', this.quantity.toString());
    // submits form
    this.managerService.addInventory(formData).subscribe({
      // on success
      next: (data) =>
        this.modifyInventoryEmitter.emit({
          status: true,
          message:
            this.quantity +
            ' unit added to stock. Total stock available: ' +
            (this.item.quantity + this.quantity),
          quantity: this.quantity,
        }),
      // on error
      error: (err) =>
        this.modifyInventoryEmitter.emit({ status: false, message: err.error }),
    });
    // close modal
    document.getElementById('close' + this.item.product.id)!.click();
  }

  /**
   * When the add/remove switch is **unchecked**, this method is called by {@link modifyItem}.  
   * Submits form using {@link ManagerService.reduceInventory()}.  
   * Modify item quantity and emits to parent for toast on success/failure.  
   * Closes modal.
   * @returns `void`
   */
  reduceItem(): void {
    // sets form
    let formData = new FormData();
    formData.set('id', this.item.product.id.toString());
    formData.set('quantity', this.quantity.toString());

    // submits form
    this.managerService.reduceInventory(formData).subscribe({
      // on success
      next: (data) => this.modifyInventoryEmitter.emit({
        status: true,
        message:
          this.quantity +
          ' unit reduced from stock. Total stock available: ' +
          (this.item.quantity - this.quantity),
        quantity: this.quantity*-1,
      }),
      // on error
      error: (err) => this.modifyInventoryEmitter.emit({ status: false, message: err.error }),
    });
    // close modal
    document.getElementById('close' + this.item.product.id)!.click();
  }

  /**
   * When add/remove switch is modified this method is called.
   * Modifies {@link addOrRemove}
   * @param event
   * @returns `void` 
   */
  modifySwitch(event: Event): void {
    this.addOrRemove = (event.target as HTMLInputElement).checked;
  }

  /**
   * When form is submitted this method is called.  
   * Based on {@link addOrRemove} it calls {@link addItem()} or {@link reduceItem()}
   * @returns `void`
   */
  modifyItem(): void {
    this.addOrRemove ? this.addItem() : this.reduceItem();
  }
}

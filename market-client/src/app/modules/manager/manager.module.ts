import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { ProductComponent } from './components/product/product.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { InventoryItemComponent } from './components/inventory-item/inventory-item.component';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddProductComponent } from './components/add-product/add-product.component';


@NgModule({
  declarations: [
    ManagerHomeComponent,
    ProductComponent,
    InventoryItemComponent,
    AddInventoryComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class ManagerModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { InventoryItemComponent } from './components/inventory-item/inventory-item.component';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddProductComponent } from './components/add-product/add-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { FacetModule } from '../facet/facet.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ManagerHomeComponent,
    InventoryItemComponent,
    AddInventoryComponent,
    AddProductComponent,
    OrderComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FacetModule,
    NgxPaginationModule
  ]
})
export class ManagerModule { }

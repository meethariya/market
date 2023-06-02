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
import { ProductModule } from '../product/product.module';
import { OrderModule } from 'ngx-order-pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

/**
 * Manager Module.  
 * All Actions for Manager belongs to this module.
 */
@NgModule({
  declarations: [
    ManagerHomeComponent,
    InventoryItemComponent,
    AddInventoryComponent,
    AddProductComponent,
    OrderComponent,
    OrderDetailComponent,
    DashboardComponent,
    RadarChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FacetModule,
    ProductModule,
    OrderModule,
    NgxPaginationModule,
    NgChartsModule
  ]
})
export class ManagerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    ManagerHomeComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }

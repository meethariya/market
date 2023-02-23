import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { ProductComponent } from './components/product/product.component';
import { ManagerRoutingModule } from './manager-routing.module';


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

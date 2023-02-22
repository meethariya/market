import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    CustomerHomeComponent,
    CartComponent,
    OrderComponent,
    ProductComponent,
    AddToCartComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    CustomerHomeComponent,
    CartComponent,
    OrderComponent
  ]
})
export class CustomerModule { }

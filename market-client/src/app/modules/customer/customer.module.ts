import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerRoutingModule } from './customer-routing.module';

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

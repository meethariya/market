import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FacetModule } from '../facet/facet.module';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { OrderComponent } from './components/order/order.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CartComponent,
    OrderComponent,
    ProductComponent,
    AddToCartComponent,
    CartItemComponent,
    PlaceOrderComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgSelectModule,
    FacetModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomerHomeComponent,
    CartComponent,
    OrderComponent
  ]
})
export class CustomerModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { OrderComponent } from './components/order/order.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';

const routes: Routes = [
  { path: '', component: CustomerHomeComponent},
  { path: 'cart', component: CartComponent},
  { path: 'order', component: OrderComponent},
  { path: 'cart/place-order', component: PlaceOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

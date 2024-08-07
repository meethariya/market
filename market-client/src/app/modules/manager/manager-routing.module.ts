import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { OrderComponent } from './components/order/order.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component:DashboardComponent},
  { path: 'inventory', component:ManagerHomeComponent},
  { path: 'add-product', component: AddProductComponent},
  { path: 'order', component: OrderComponent}
];

/**
 * Routing for App route link `/manager/*`
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }

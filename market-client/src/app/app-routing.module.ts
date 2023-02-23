import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerGuard } from './modules/customer/guard/customer.guard';
import { ManagerGuard } from './modules/manager/guard/manager.guard';
import { RegisterComponent } from './modules/user-auth/components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'customer',
    loadChildren: () =>
      import('./modules/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
    canActivateChild: [CustomerGuard]
  },
  {
    path: 'manager',
    loadChildren: () =>
      import('./modules/manager/manager.module').then(
        (m) => m.ManagerModule
      ),
    canActivateChild: [ManagerGuard]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

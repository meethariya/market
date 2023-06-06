import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FacetModule } from '../facet/facet.module';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';


/**
 * UserAuth Module.  
 * All authentication functionalities belongs to this module.
 */
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    TermsConditionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FacetModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ]
})
export class UserAuthModule { }

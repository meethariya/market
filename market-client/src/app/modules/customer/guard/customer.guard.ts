import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivateChild {

  constructor(private customerService: CustomerService, private router: Router){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.customerService.isCustomer().then(b=>{
        if (b) {
          return true;
        }else {
          this.router.navigate(['/']);
          return false;
        }
      })
  }
  
}

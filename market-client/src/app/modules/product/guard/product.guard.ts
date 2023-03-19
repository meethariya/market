import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

/**
 * Product guard. 
 * Verifies if the user logged in or not.  
 * Uses {@link ProductService.isAuthenticated()}.
 * If the user is not authenticated redirects to home page.  
 * App Route Link: `/product/*`
 */
@Injectable({
  providedIn: 'root',
})
export class ProductGuard implements CanActivate {
  constructor(private productService: ProductService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.productService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ManagerService } from '../services/manager.service';

/**
 * Manager guard. 
 * Verifies if the user logged in is manager or not.  
 * Uses {@link ManagerService.isManager()}.
 * If the user is not manager redirects to home page.  
 * App Route Link: `/manager/*`
 */
@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivateChild {

  constructor(private managerService: ManagerService, private router: Router){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.managerService.isManager().then(b=>{
        if (b) {
          return true;
        }else {
          this.router.navigate(['/']);
          return false;
        }
      })
  }
  
}

import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
/**
 * Logout Component.
 * This component is part of {@link NavbarComponent}.  
 * When clicked it emits to parent and removes all saved sessions using {@link UserAuthService.logout()}
 */
@Component({
  selector: 'app-logout',
  template: `<button class="btn" (click)="logout()">Logout</button>`,
  styles: [
  ]
})
export class LogoutComponent {
  @Output() logoutEmitter: EventEmitter<void> = new EventEmitter();

  constructor(private userAuthService: UserAuthService){}

  /**
   * Logout user.  
   * @see {@link UserAuthService.logout()}.
   * @returns `void`
   */
  logout(){
    this.userAuthService.logout();
    this.logoutEmitter.emit();
  }
}

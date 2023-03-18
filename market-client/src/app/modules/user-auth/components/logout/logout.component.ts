import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-logout',
  template: `<button class="btn" (click)="logout()">Logout</button>`,
  styles: [
  ]
})
export class LogoutComponent {
  @Output() logoutEmitter: EventEmitter<void> = new EventEmitter();

  constructor(private userAuthService: UserAuthService){}

  logout(){
    this.userAuthService.logout();
    this.logoutEmitter.emit();
  }
}

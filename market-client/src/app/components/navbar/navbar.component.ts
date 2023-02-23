import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .nav-item.active {
        border-bottom: 2px solid #ffffff;
      }
    `,
  ],
})
export class NavbarComponent {
  authenticated: boolean;
  role: string | null = null;

  constructor(private generalService: GeneralService) {
    this.authenticated = this.generalService.isAuthenticated();
    this.role = this.generalService.getRole();
  }

  loggedIn(role: string) {
    this.role = role;
    this.authenticated = true;
  }

  loggedOut() {
    this.role = null;
    this.authenticated = false;
  }
}

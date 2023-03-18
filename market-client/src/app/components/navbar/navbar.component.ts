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
  name: string | null = null;
  profilePicPath: string | null = null;

  constructor(private generalService: GeneralService) {
    this.authenticated = this.generalService.isAuthenticated();
    this.role = this.generalService.getRole();
    this.name = this.generalService.getName();
    this.profilePicPath = this.generalService.getProfilePic();
  }

  loggedIn(data:{role: string, name: string, profilePic: string}) {
    this.role = data.role;
    this.name = data.name;
    this.profilePicPath = data.profilePic;
    this.authenticated = true;
  }
  
  loggedOut() {
    this.role = null;
    this.name = null;
    this.profilePicPath = null;
    this.authenticated = false;
  }
}

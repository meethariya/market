import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {
  authenticated: boolean;

  constructor(private generalService: GeneralService){
    this.authenticated = generalService.isAuthenticated();
  }

  loggedIn(){
    this.authenticated = true;
  }

  loggedOut(){
    this.authenticated = false;
  }
}

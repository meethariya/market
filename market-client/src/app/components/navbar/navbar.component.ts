import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {
  authenticated = false;

  loggedIn(){
    this.authenticated = true;
  }

  loggedOut(){
    this.authenticated = false;
  }
}

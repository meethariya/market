import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {
  email!: string;
  password!: string;

  login(){
    console.log(this.email);
    console.log(this.password);
  }
}

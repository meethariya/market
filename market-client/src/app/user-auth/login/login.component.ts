import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;
  failedLogin:boolean = false;

  constructor(private userAuthService: UserAuthService) {}
  @Output() loginEmitter: EventEmitter<void> = new EventEmitter();

  login() {
    this.userAuthService.login(this.email, this.password).subscribe({
      next: (data) => {
        localStorage.setItem(
          'cred',
          JSON.stringify(
            'Basic ' + window.btoa(this.email + ':' + this.password)
          )
        );
        console.log(localStorage.getItem('cred'));
        this.loginEmitter.emit();
      },
      error: (err) => this.failedLogin=true
    });
  }
}

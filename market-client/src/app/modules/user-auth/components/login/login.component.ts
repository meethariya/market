import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;
  failedLogin: boolean = false;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  @Output() loginEmitter: EventEmitter<{
    role: string;
    name: string;
    profilePic: string;
  }> = new EventEmitter();

  /**
   * creates token using email and password.
   * validates the email and password using api.
   * on success; saves token in local storage, emits to navbar to change login to logout,
   * naviagtes to /customer or /manager based on role of the user; closes modal.
   * on failure, shows invalid credentials.
   */
  login(): void {
    // form data for the login method
    let formData: FormData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);

    let token = window.btoa(this.email + ':' + this.password);

    this.userAuthService.login(formData, token).subscribe({
      next: (user: User) => {
        this.userAuthService.setToken(token);
        this.userAuthService.setRole(user.role);
        this.userAuthService.setName(user.name);
        this.userAuthService.setProfilePic(user.profilePicPath);
        this.failedLogin = false;
        this.loginEmitter.emit({
          role: user.role,
          name: user.name,
          profilePic: user.profilePicPath,
        });
        this.router.navigate([user.role.toLowerCase()]);
        document.getElementById('closeButton')!.click();
      },
      error: (err) => {
        this.failedLogin = true;
      },
    });
  }
}

import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { LoginComponent } from 'src/app/modules/user-auth/components/login/login.component';
import { LogoutComponent } from 'src/app/modules/user-auth/components/logout/logout.component';

/**
 * Navbar component. Static for all route links.  
 * It contains {@link LoginComponent} and {@link LogoutComponent} components.  
 * Based on {@link authenticated} login and logout component will be displayed.  
 * If user is logged in, it'll show his name and profile picture in the navbar.  
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      /* mark the active route link */
      .nav-item.active {
        border-bottom: 2px solid #ffffff;
      }
    `,
  ],
})
export class NavbarComponent {
  authenticated: boolean;                 // user is authenticated or not
  role: string | null = null;             // role of user if authenticated, else null
  name: string | null = null;             // name of user if authenticated, else null
  profilePicPath: string | null = null;   // profilePicPath of user if authenticated, else null

  /**
   * sets authenticated value on loadup using {@link GeneralService.isAuthenticated()}.  
   * sets role value on loadup using {@link GeneralService.getRole()}.  
   * sets name value on loadup using {@link GeneralService.getName()}.  
   * sets profilePicPath value on loadup using {@link GeneralService.getProfilePic()}.  
   * @param generalService: {@link GeneralService} 
   */
  constructor(private generalService: GeneralService) {
    this.authenticated = this.generalService.isAuthenticated();
    this.role = this.generalService.getRole();
    this.name = this.generalService.getName();
    this.profilePicPath = this.generalService.getProfilePic();
  }

  /**
   * On success login this method is invoked from {@link LoginComponent.login()} using emitter.  
   * {@link role}, {@link name}, {@link profilePicPath} and {@link authenticated} are being set using emitter data.
   * @param data
   * @returns `void`
   */
  loggedIn(data:{role: string, name: string, profilePic: string}):void {
    this.role = data.role;
    this.name = data.name;
    this.profilePicPath = data.profilePic;
    this.authenticated = true;
  }
  
  /**
   * On success logout this method is invoked from {@link LogoutComponent.logout()} using emitter.  
   * {@link role}, {@link name}, {@link profilePicPath} and {@link authenticated} are being set as null.
   * @param data
   * @returns `void`
   */
  loggedOut() {
    this.role = null;
    this.name = null;
    this.profilePicPath = null;
    this.authenticated = false;
  }
}

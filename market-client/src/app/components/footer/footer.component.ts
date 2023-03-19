import { Component } from '@angular/core';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

/**
 * Footer component for entire website.  
 * This component contains app name path and github repo.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent {
  linkedIn = faLinkedin;      //linkedIn Icon
  github = faGithub;          // Github Icon
  instagram = faInstagram;    // Instagram Icon
}

import { Component } from '@angular/core';
import {
  faGitlabSquare,
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
  gitlab = faGitlabSquare;    // Gitlab Icon
  instagram = faInstagram;    // Instagram Icon
}

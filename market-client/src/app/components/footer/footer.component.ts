import { Component } from '@angular/core';
import {
  faGitlabSquare,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
  mail = faEnvelope;    // Mail Icon
}

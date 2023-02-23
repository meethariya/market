import { Component } from '@angular/core';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {
  linkedIn = faLinkedin;
  github = faGithub;
  instagram = faInstagram;
}
